<template>
  <div>
    <div class="home">
      <div class="home-header">
        <h2 class="home-header__title">
          Информации о ботах
        </h2>
        <button
          @click="$bvModal.show('bot-info')"
          class="home-header__add btns blue"
        >
          Добавить
        </button>
      </div>
      <bot-info :infos="infos" @editInfo="editInfo" @deleteInfo="deleteInfo" />
    </div>
    <b-modal @hidden="resetData" id="bot-info" centered title="add" hide-footer>
      <div class="modal-body p-0">
        <div class="modal-body__input">
          <label for="name">Название</label>
          <input
            type="text"
            v-model="form.name"
            autocomplete="off"
            name="name"
          />
        </div>
        <div class="modal-body__input">
          <label for="description">Описание</label>
          <input
            type="text"
            name="description"
            v-model="form.description"
            autocomplete="off"
          />
        </div>

        <label class="label" for="image">Картинки</label>

        <draggable
          v-model="form.images"
          class="modal-body-images"
          ghost-class="ghost"
          @start="dragging = true"
          @end="dragging = false"
        >
          <label
            v-for="(item, idx) in form.images"
            :key="item.id"
            class="modal-body__drag images"
          >
            <input type="file" name="image" @change="addItem(idx, $event)" />
            <div class="file">
              <div class="file__btn btns grey">
                Выберите файл
              </div>
              <div class="file-name" v-if="item.file">{{ item.file.name }}</div>
            </div>
            <button
              class="btns red"
              v-if="item.file !== null"
              @click="deleteFile(idx)"
            >
              Удалить
            </button>
          </label>
        </draggable>

        <div class="modal-body__date">
          <label class="label" for="datepicker-full-width">Выберите дату</label>
          <b-form-datepicker
            placeholder="дата не вырана"
            id="datepicker-full-width"
            v-model="form.date"
            menu-class="w-100"
            calendar-width="100%"
            class="mb-2"
          ></b-form-datepicker>
        </div>

        <button
          :disabled="!isFilled"
          class="modal-submit btns green"
          @click="submitForm"
        >
          Сохранить
        </button>
      </div>
    </b-modal>
  </div>
</template>

<script>
import BotInfo from "@/components/BotInfo.vue";
import draggable from "vuedraggable";
import { mapState } from "vuex";

export default {
  name: "Home",
  data: () => ({
    dragging: false,
    enabled: false,
    edit: false,

    form: {
      name: "",
      description: "",
      date: null,
      images: [
        {
          id: new Date().getTime(),
          file: null,
        },
      ],
    },
  }),
  computed: {
    ...mapState({
      infos: (state) => state.infos,
    }),
    isFilled() {
      let filled = false;
      let form = this.form;
      if (
        form.name !== "" &&
        form.description !== "" &&
        form.date !== null &&
        form.images[0].file !== null
      ) {
        filled = true;
      }

      return filled;
    },
  },
  methods: {
    submitForm() {
      let formCopy = { ...this.form };
      formCopy.images = this.form.images.filter((obj) => obj.file !== null);
      if (!this.edit) {
        this.$store.commit("SET_INFO", formCopy);
        this.$bvModal.hide("bot-info");
      } else {
        this.$store.commit("EDIT_INFO", formCopy);
        this.$bvToast.toast("Успешно изменено", {
          variant: "success",
          autoHideDelay: 5000,
        });
      }
    },
    deleteFile(index) {
      this.form.images.splice(index, 1);
    },
    resetData() {
      this.form = {
        name: "",
        description: "",
        date: null,
        images: [
          {
            id: new Date().getTime(),
            file: null,
          },
        ],
      };
      this.edit = false;
    },
    addItem(index, item) {
      if (item.target.files[0]) {
        this.form.images[index].file = item.target.files[0];
        if (this.form.images.every((e) => e.file !== null)) {
          this.form.images.push({
            id: new Date().getTime(),
            file: null,
          });
        }
      }
    },
    deleteInfo(val) {
      this.$store.commit("DELETE_INFO", val);
    },
    editInfo(val) {
      console.log("edit");
      this.form = {
        ...val,
      };
      this.form.images.push({
        id: new Date().getTime(),
        file: null,
      });
      this.edit = true;
      this.$bvModal.show("bot-info");
    },
  },
  components: {
    BotInfo,
    draggable,
  },
};
</script>

<style lang="scss" scoped>
.home {
  &-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 24px;
  }
}
</style>
