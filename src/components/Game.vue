<script setup lang="ts">
const props = defineProps({
  index: Number,
  turn: String,
  locked: Boolean,
  ring: String,
});
const emit = defineEmits(["changeTurn", "win"]);

function checkCells(array: any[], i1: number, i2: number, i3: number) {
  return array[i1] === array[i2] && array[i2] === array[i3] && array[i1] !== "";
}
function checkWin() {
  let cells: string[] | Element[] = Array.from(
    document.querySelectorAll(`[data-key="${props.index}"]>div`)
  );
  cells = cells.map((cell) => {
    return cell.innerHTML;
  });
  let win: boolean = false;
  win =
    checkCells(cells, 0, 1, 2) ||
    checkCells(cells, 3, 4, 5) ||
    checkCells(cells, 6, 7, 8) ||
    checkCells(cells, 0, 3, 6) ||
    checkCells(cells, 1, 4, 7) ||
    checkCells(cells, 2, 5, 8) ||
    checkCells(cells, 0, 4, 8) ||
    checkCells(cells, 2, 4, 6);
  if (win) {
    emit("win", props.index, props.turn);
  }
}

function placeObj(e: Event) {
  let target = e.target as HTMLDivElement;
  if (props.locked) {
    target?.addEventListener("click", placeObj, { once: true });
    return;
  }
  target.innerHTML =
    props.turn === "X"
      ? "<span class='text-red'>X</span>"
      : "<span class='text-blue'>O</span>";
  checkWin();
  emit("changeTurn", target.dataset.key);
}
</script>

<template>
  <section
    id="grid"
    class="b-5 b-transparent of-hidden transition duration-300 ring-3 ring-green-8 all:user-select-none grid grid-cols-3 grid-rows-3 gap-2 gap-red place-items-center bg-zinc-9 aspect-square rounded-xl h-full"
    :class="{
      locked: props.locked,
      owin: props.ring === 'O',
      xwin: props.ring === 'X',
    }"
    un-children="shadow-lg flex items-center justify-center w-full h-full font-900 text-120% bg-zinc-8 text-shadow"
  >
    <div v-for="i in 9" :data-key="i" @click.once="placeObj"></div>
  </section>
</template>

<style scoped>
.locked {
  --at-apply: "ring-transparent";
}
</style>
