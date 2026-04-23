<script setup>
import WouldYouRather from './components/WouldYouRather.vue'
// unmounted is a lifecycle hook that runs when the component is unmounted (removed from the DOM). 
// We can use it to perform cleanup tasks, such as clearing timers or canceling network requests.
import {onMounted, ref} from 'vue'
// Import the service that will fetch random WYR questions from our API
import wyrService from './services/wyrService' 


// These will hold the question and answers for the "Would You Rather" game
const wyrQuestion = ref(' ')
const wyrAnswer1 = ref(' ')
const wyrAnswer2 = ref(' ')

// This will store the user's choice
const userChoice = ref('')

// onMounted is a lifecycle hook that runs when the component is mounted (added to the DOM).
onMounted( () => {
  wyrService.getRandomWYR().then(wyrData => {
    // Expect wyrData to be something like: 
    // { "question": "Play any musical instrument or speak any language?", 
    // "answer1": "Play any musical instrument", 
    // "answer2": "Speak any language" }

    wyrQuestion.value = wyrData.question // Update the question ref with the fetched question
    wyrAnswer1.value = wyrData.answer1 // Update the answer1 ref with the fetched answer1
    wyrAnswer2.value = wyrData.answer2 // Update the answer2 ref with the fetched answer2
  }).catch(error => {
    console.error('Error fetching WYR question/answer:', error) // Log any errors that occur during the fetch
  })
})

function updateUserSelection(choice) {
  // This function will be called when the user makes a choice in the WouldYouRather component
  userChoice.value = `Thanks! You chose: ${choice}` // Update the userChoice ref with the selected answer
  console.log('User selected:', userChoice.value) // Log the user's choice to the console for now
}

</script>

<template>
  <div id="app-component">
  <h1>Hello! Would You Rather?</h1>

  <!-- Passes the question and answers as props to the WouldYouRather component -->
  <WouldYouRather 
  v-bind:question="wyrQuestion" 
  v-bind:answer1="wyrAnswer1" 
  v-bind:answer2="wyrAnswer2"
  v-on:answer-chosen="updateUserSelection" /> 
  <!-- Listens for the 'answerChosen' event from the WouldYouRather component and call updateUserSelection when it occurs -->
  <b><p v-if="userChoice"> {{ userChoice }}</p></b> <!-- Display the user's choice -->
  </div>
</template>

<style scoped>
/* Styles will be applied to both the app component and its children */
#app-component {
  text-align: center;
  font-family: 'Arial', sans-serif;
}

 p {
  font-family: 'Courier New', Courier, monospace;
}
</style>