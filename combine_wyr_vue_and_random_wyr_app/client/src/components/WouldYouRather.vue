<script setup>
import { ref, watch } from 'vue';

defineProps({
  // These props will receive the question and answers from the parent component (App.vue)
  question: String,
  answer1: String,
  answer2: String
})

const emit = defineEmits([
  'answer-chosen'
]) // This will allow us to emit an event when the user makes a choice

const choice = ref('') // This will store the user's choice

// function choiceMade() {
//   // This function will be called when the user makes a choice
//   // console.log('User chose:', choice.value) // For now, we just log the choice to the console
//   // emit event to tell the parent component about the user's choice (if needed)
//   emit('answerChosen', choice.value) // .value is the current value of the choice ref, which will be either answer1 or answer2
// }

// Watch the choice ref for changes
watch(choice, () => {
  emit('answer-chosen', choice.value) // Emit the 'answer-chosen' event with the current choice whenever it changes
})

</script>

<template>
  <div id="wyr">
  <h2>Make your choice!</h2>

  <div class="question">
    <p>{{ question }}</p>
  </div>
  <div class="radio-group">
    <!-- v-model binds the input to the choice ref -->
    <!-- :value binds the input's value to the answer prop -->
    <!-- name groups the radio buttons -->
    <!-- id binds the label to the input -->
    <input v-model="choice" :value="answer1" type="radio" name="choice" id="answer1">
    <label for="answer1">{{ answer1 }}</label>

    <input v-model="choice" :value="answer2" type="radio" name="choice" id="answer2">
    <label for="answer2">{{ answer2 }}</label>
  </div>
  </div>
</template>

<style scoped>
/* Styles will be applied to the WouldYouRather component but not to App.vue, the parent component */
#wyr {
  border: 1px solid #ccc;
  padding: 20px;
  border-radius: 8px;
  max-width: 400px;
  margin: auto;
}
p {
  font-family: emily-cursive, cursive;
}
.question {
  margin-bottom: 20px;
}
/* I wanted to keep the radio buttons inline */
.radio-group {
  display: inline; 
  gap: 10px; 
}
</style>
