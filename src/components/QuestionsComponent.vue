<template>
  <v-card
    class="pa-4"
    outlined
  >
    <h1
      class="title grey--text text-center"
      v-if="getQA.length == 0"
    >No questions yet</h1>
    <v-list>
      <v-list-item
        v-for="question in getQA"
        :key="question.id"
      >
        <v-list-item-content>
          <v-row justify="space-between">
            <h1 class="title primary--text">{{ question.questionText }} </h1>
            <v-btn
              icon
              color="red"
              outlined=""
              text
              small
              class="mr-4"
              @click="isDeleteQuestionDialogVisible = true; currentQuestion = question"
            >
              <v-icon>mdi-delete</v-icon>
            </v-btn>
          </v-row>
          <v-row
            v-if="question.answerText == '' || question.answerText == null"
            justify="start"
            align="center"
            class="ma-4"
          >
            <span class="grey--text">No answer yet</span>
            <v-btn
              class="mx-4"
              color="primary"
              @click="isAnswerQuestionDialogVisible = true; currentQuestion = question;"
            >Add an answer</v-btn>
          </v-row>
          <v-row
            v-else
            justify="start"
            align="center"
            class="ma-4"
          >
            <h2 class="subtitle-1"> {{ question.answerText }} </h2>
          </v-row>
          <v-divider></v-divider>
        </v-list-item-content>
      </v-list-item>
    </v-list>
    <v-dialog
      max-width="600"
      v-model="isAnswerQuestionDialogVisible"
    >
      <v-card>
        <v-card-title> Provide an answer to the question</v-card-title>
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


export default {
  props: ['itemId'],
  apollo: {
    getQA: {
      query: getQA,
      variables () {
        return {
          inventoryId: this.itemId
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
      itemId: 0,
      isDeleteQuestionDialogVisible: false,
      isAnswerQuestionDialogVisible: false,
      isErrorDialogVisible: false,
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