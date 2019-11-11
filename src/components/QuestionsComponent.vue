<template>
  <v-card elevation="0">
    <v-card
      class="pa-4 my-4"
      outlined
      style="border-radius:8px;"
      v-if="getQA.length == 0"
    >
      <h2 class="title grey--text text-center">No questions yet</h2>
    </v-card>
    <v-card
      class="my-4"
      outlined
      style="border-radius:8px;"
      v-for="question in getQA"
      :key="question.id"
    >
      <v-col
        cols='12'
        class="pa-4 mx-4"
      >
        <h2 class="subtitle-1"><b> {{ question.questionText }}</b></h2>
        <h2
          class="subtitle-1 primary--text"
          v-if="!!question.answerText"
        > {{ question.answerText }} </h2>
        <h2
          class="subtitle-1 grey--text text-center"
          v-else
        > This question is unanswered</h2>
      </v-col>

      <v-divider></v-divider>
      <v-row
        align="center"
        justify="space-between"
      >
        <v-btn
          class="ma-4"
          color="primary"
          rounded
          elevation="0"
          @click="isAnswerQuestionDialogVisible = true; currentQuestion = question; answerInput = '';"
          v-if="!!item.vendor ? item.vendor.id == loggedInUser.id && !!question.answerText == false : !!question.answerText == false"
        >
          <v-icon
            left
            small
          >mdi-plus</v-icon>
          Add an answer
        </v-btn>
        <v-btn
          class="ma-4"
          color="primary"
          rounded
          outlined
          text
          elevation="0"
          @click="isAnswerQuestionDialogVisible = true; currentQuestion = question; answerInput = question.answerText;"
          v-if="!!item.vendor ? item.vendor.id == loggedInUser.id  && !!question.answerText : !!question.answerText"
        >
          <v-icon
            left
            small
          >mdi-pencil</v-icon>
          Edit answer
        </v-btn>
        <v-btn
          v-if="!!item.vendor && (item.vendor == loggedInUser.id) == false"
          disabled
          text
          class="ma-4"
        >Only the vendor of this item can answer questions</v-btn>

        <v-btn
          color="red"
          text
          small
          class="mr-4"
          @click="isDeleteQuestionDialogVisible = true; currentQuestion = question"
        >
          <v-icon>mdi-delete</v-icon>Delete question
        </v-btn>
      </v-row>
    </v-card>

    <v-dialog
      max-width="600"
      v-model="isAnswerQuestionDialogVisible"
    >
      <v-card>
        <v-card-title> Provide an answer to the question. If you are editing an existing answer, the existing answer will be overwritten.</v-card-title>
        <v-card-text>The question asks: {{ currentQuestion.questionText }} </v-card-text>
        <v-textarea
          filled
          class="pa-2"
          single-line
          v-model="answerInput"
        ></v-textarea>
        <v-card-actions>
          <v-spacer>

          </v-spacer>
          <v-btn
            text
            color="primary"
            @click="isAnswerQuestionDialogVisible = false;"
          >Cancel</v-btn>
          <v-btn
            elevation="0"
            color="primary"
            @click="runAnswerQuestionMutation()"
          >
            Answer
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-dialog
      max-width="400"
      v-model="isDeleteQuestionDialogVisible"
    >
      <v-card>
        <v-card-title> Are you sure you want to delete this question?</v-card-title>
        <v-card-text>The question asks: {{ currentQuestion.questionText }} </v-card-text>
        <v-card-actions>
          <v-spacer>

          </v-spacer>
          <v-btn
            text
            color="primary"
            @click="isDeleteQuestionDialogVisible = false;"
          >Cancel</v-btn>
          <v-btn
            elevation="0"
            outlined
            text
            color="red"
            @click="runDeleteQuestionMutation()"
          >
            Delete
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-dialog
      max-width="400"
      v-model="isErrorDialogVisible"
    >
      <v-card>
        <v-card-title> {{ error.title }} </v-card-title>
        <v-card-text> {{ error.text }} </v-card-text>
        <v-card-actions>
          <v-spacer>

          </v-spacer>
          <v-btn
            text
            color="primary"
            @click="isErrorDialogVisible = false;"
          >Got it</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-card>
</template>

<script>
import { getQA } from "../graphql/getQA";
import { deleteQuestionMutation } from "../graphql/deleteQuestion";
import { answerQuestionMutation } from "../graphql/answerQuestion";
import { LoginSessionHandler } from "../helpers/loginSessionHandler";

export default {
  computed: {
    loggedInUser: function () {
      return new LoginSessionHandler()
    }
  },
  props: ['item'],
  apollo: {
    getQA: {
      query: getQA,
      variables () {
        return {
          inventoryId: this.item.id
        }
      },
      pollInterval: 3
    }
  },
  methods: {
    async runAnswerQuestionMutation () {
      this.isAnswerQuestionDialogVisible = false;
      await this.$apollo.mutate({
        mutation: answerQuestionMutation,
        variables: {
          questionId: this.currentQuestion.id,
          answerText: this.answerInput
        }
      }).then((result) => console.log('Mutation succeeded', result),
        (reason) => {
          this.error.title = "Server returned error.";
          this.error.text = reason;
          this.isErrorDialogVisible = true;
        });
    },
    async runDeleteQuestionMutation () {
      this.isDeleteQuestionDialogVisible = false;
      await this.$apollo.mutate({
        mutation: deleteQuestionMutation,
        variables: {
          questionId: this.currentQuestion.id,
        }
      }).then((result) => console.log('Mutation succeeded', result),
        (reason) => {
          this.error.title = "Server returned error.";
          this.error.text = reason;
          this.isErrorDialogVisible = true;
        });
    }
  },
  data () {
    return {
      item: {
        id: 0
      },
      isDeleteQuestionDialogVisible: false,
      isAnswerQuestionDialogVisible: false,
      isErrorDialogVisible: false,
      getQA: [],
      currentQuestion: {},
      error: {
        title: "",
        text: ""
      },
      answerInput: ''
    }
  }

}
</script>

<style>
</style>