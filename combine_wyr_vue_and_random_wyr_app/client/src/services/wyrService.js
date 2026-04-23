export default {
    getRandomWYR() { // return a Promise object that resolves to a random WYR question
        return fetch('/wyr').then(response => { // Why /wyr? Because that's the endpoint we set up in our Express server to return a random WYR question.
            return response.json();
        });
    }
}