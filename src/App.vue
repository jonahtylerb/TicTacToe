<script setup lang="ts">
import { ref } from "vue";
import Game from "./components/Game.vue";

const turn = ref<"O" | "X">("X");
const wins = ref(["", "", "", "", "", "", "", "", ""]);
const fill = [0, 0, 0, 0, 0, 0, 0, 0, 0];
const locks = ref<boolean[]>([
  false,
  false,
  false,
  false,
  false,
  false,
  false,
  false,
]);

function play(index: number) {
  locks.value = new Array(9).fill(true);
  locks.value[index - 1] = false;
  fill[index - 1]++;
  if (fill[index - 1] > 8) {
    locks.value = new Array(9).fill(false);
  }
  fill.forEach((fillLevel, i) => {
    if (fillLevel > 8) {
      locks.value[i] = true;
    }
  });
  turn.value = turn.value === "X" ? "O" : "X";
}

function checkCells(i1: number, i2: number, i3: number) {
  return (
    wins.value[i1] === wins.value[i2] &&
    wins.value[i2] === wins.value[i3] &&
    wins.value[i1] !== ""
  );
}

function checkWin() {
  if (
    checkCells(0, 1, 2) ||
    checkCells(3, 4, 5) ||
    checkCells(6, 7, 8) ||
    checkCells(0, 3, 6) ||
    checkCells(1, 4, 7) ||
    checkCells(2, 5, 8) ||
    checkCells(0, 4, 8) ||
    checkCells(2, 4, 6)
  ) {
    alert(`${turn.value}'s wins!`);
    locks.value = new Array(9).fill(true);
  }
}

function win(index: number, team: string) {
  if (wins.value[index - 1] === "") {
    wins.value[index - 1] = team;
    checkWin();
  }
}
</script>

<template>
  <main class="flex flex-col items-center py-20 p-5 max-w-90ch mx-auto">
    <header prose class="text-center flex flex-col items-center mb-10">
      <h1>Hard Tic Tac Toe</h1>
      <p>
        Hello There! This is just a simple 2 player game I recreated to learn
        Vue! If you don't know how to play, the rules are simple. You can only
        play in on the green grid(s). Your goal is to win Tic Tac Toe on the big
        grid by winning the small ones but remember that where you play in the
        small grid your opponent will play in the big grid. Have Fun!
      </p>
      <div
        class="bg-zinc-8 px-5 py-3 text-bold text-2xl rounded-xl ring-3 ring-transparent"
      >
        {{ turn }}'s Turn
      </div>
    </header>
    <section
      class="grid grid-cols-3 grid-rows-3 gap-4 rounded-xl place-items-center items-center justify-center max-w-screen w-50% w-full max-h-screen mx-auto h-full aspect-square"
    >
      <Game
        v-for="i in 9"
        :ring="wins[i - 1]"
        :key="i"
        :turn="turn"
        :index="i"
        :data-key="i"
        @changeTurn="play"
        @win="win"
        :locked="locks[i - 1]"
      />
    </section>
  </main>
</template>

<style>
* {
  font-family: "Comfortaa Variable", sans-serif;
}
body,
html {
  --at-apply: bg-zinc-9 text-zinc-3;
}
.xwin {
  --at-apply: "b-red-6/70!";
}
.owin {
  --at-apply: "b-blue/70!";
}
</style>
