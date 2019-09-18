<template>
  <div class="volunteer-dashboard">
    <dashboard-banner />

    <div class="volunteer-dashboard__body">
      <div class="students-waiting dashboard-card">
        <div class="dashboard-card__title">Waiting Students</div>
        <div v-if="isSessionInProgress">
          <button class="btn getHelp" @click.prevent="rejoinHelpSession()">
            Rejoin your coaching session
          </button>
        </div>
        <div v-else>
          <div class="dashboard-card__description">Students waiting for help will show up below.</div>
          <list-sessions />
        </div>
      </div>
      <div class="volunteer-checklist dashboard-card">
        <div class="dashboard-card__title">Your Checklist</div>

        <div class="volunteer-checklist__items">
          <div
            v-for="(todo, todoIndex) in onboardingTodos"
            v-bind:key="`volunteer-todo-${todoIndex}`"
            class="checklist-item"
          >
            <input
              type="checkbox"
              :id="`volunteer-todo-${todoIndex}`"
              class="checklist-item__checkbox"
            >
            <label
              :for="`volunteer-todo-${todoIndex}`"
              class="checklist-item__checkbox-label"
            ></label>

            <div class="checklist-item__info">
              <div class="checklist-item__title">{{ todo.title }}</div>
              <div class="checklist-item__description">{{ todo.description }}</div>
            </div>

            <a
              class="checklist-item__cta"
              :href="todo.buttonLink"
            >{{ todo.buttonText }}</a>
          </div>
        </div>
      </div>

    </div>
  </div>
</template>

<script>
import { mapState, mapGetters } from "vuex";

import UserService from "@/services/UserService";

import ListSessions from "./ListSessions";
import DashboardBanner from "../DashboardBanner";

const onboardingTodos = [
  {
    title: "Proof of identity",
    description: "foo bar, how to, biz baz, etc",
    buttonText: "Upload photo",
    buttonLink: "https://google.com"
  }, {
    title: "Two references",
    description: "foo bar, how to, biz baz, etc",
    buttonText: "Provide refs",
    buttonLink: "/calendar"
  }, {
    title: "Set up info call",
    description: "foo bar, how to, biz baz, etc",
    buttonText: "Schedule call",
    buttonLink: "https://google.com"
  }, {
    title: "Schedule availability",
    description: "foo bar, how to, biz baz, etc",
    buttonText: "Edit calendar",
    buttonLink: "https://google.com"
  }, {
    title: "Take a subject quiz",
    description: "foo bar, how to, biz baz, etc",
    buttonText: "Take a quiz",
    buttonLink: "https://google.com"
  },
];

export default {
  name: "dashboard-view",
  components: { ListSessions, DashboardBanner },
  data() {
    const user = UserService.getUser() || {};

    return {
      user,
      name: user.firstname || "student",
      onboardingTodos: onboardingTodos
    };
  },
  computed: {
    ...mapState({
      sessionPath: state => state.user.sessionPath
    }),
    ...mapGetters({
      isSessionInProgress: "user/isSessionInProgress"
    })
  },
  methods: {
    rejoinHelpSession() {
      const path = this.sessionPath;
      if (path) {
        this.$router.push(path);
      } else {
        this.$router.push("/");
      }
    }
  }
};
</script>

<style lang="scss" scoped>

.btn {
  height: 60px;
  background-color: #16d2aa;
  border: none;
  font-size: 16px;
  font-weight: 600;
  margin-bottom: 20px;
  color: white;
  line-height: 40px;

  &:hover {
    background-color: #16d2aa;
  }

  &:disabled {
    color: white;
  }

  &.getHelp {
    border-radius: 30px;
    width: 300px;
  }
}

.volunteer-dashboard {
  @include flex-container(column);
  @include child-spacing(top, 40px);
  padding: 40px 15px;

  @include breakpoint-above("medium") {
    display: inline-flex;
    min-width: 100%;
    padding: 40px;
  }

  &__body {
    @include child-spacing(top, 16px);
    @include child-spacing(right, 0);

    @include breakpoint-above("huge") {
      @include child-spacing(top, 0);
      @include child-spacing(right, 40px);

      @include flex-container(row);

      & > * {
        flex-basis: 50%;
      }
    }
  }
}

.dashboard-card {
  background: #fff;
  border-radius: 8px;
  padding: 40px 10px;

  @include breakpoint-above("medium") {
    padding: 40px 30px;
  }

  &__title {
    font-size: 30px;
    margin: 0 0 15px;
  }

  &__description {
    font-size: 16px;
    color: $c-secondary-grey;
    margin: 15px 0;
  }
}

.volunteer-checklist {
  &__items {
    @include child-spacing(top, 8px);
  }
}

.checklist-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: relative;
  padding: 8px 3px;
  border-radius: 4px;

  @include breakpoint-above("medium") {
    padding: 8px 15px;
  }

  &:hover {
    background: #f9f9f9;
  }

  &__checkbox {
    margin: 0;
    position: absolute;
    left: 8px;
    
    @include breakpoint-above("medium") {
      left: 20px;
    }
  }

  &__checkbox-label {
    margin: 0;
    position: absolute;
    width: calc(100% - 200px);
    height: 100%;
    cursor: pointer;
  }

  &__info {
    display: flex;
    flex-direction: column;
    text-align: left;
    margin-left: 30px;

    @include breakpoint-above("medium") {
      margin-left: 38px;
    }
  }

  &__title {
    font-size: 16px;
    font-weight: 500;
  }

  &__description {
    color: #666;
  }

  &__cta {
    flex-shrink: 0;
    border-radius: 30px;
    background: $c-success-green;
    color: #fff;
    padding: 5px 10px;
    font-size: 13px;
    min-width: 95px;
    box-sizing: content-box;

    @include breakpoint-above("medium") {
      padding: 5px 15px;
      font-size: 14px;
    }

    &:hover {
      text-decoration: none;
    }
  }
}

</style>
