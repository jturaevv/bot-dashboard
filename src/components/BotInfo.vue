<template>
  <div class="bot-info">
    <table class="list">
      <tr class="list-header">
        <th class="list-header__item index">
          №
        </th>
        <th class="list-header__item name">
          Название
        </th>
        <th class="list-header__item delete">
          Удалить
        </th>
      </tr>
      <tr
        class="list-body"
        v-for="(item, index) in infos"
        :key="index"
        @click="$emit('editInfo', item)"
      >
        <td class="list-body__item index">
          {{ index + 1 }}
        </td>
        <td class="list-body__item name">
          {{ item.name }}
        </td>
        <td class="list-body__item delete">
          <button
            class="btns red icon-fill"
            @click.stop="$emit('deleteInfo', index)"
          >
            Удалить
          </button>
        </td>
      </tr>
    </table>

    <div class="no-info" v-if="infos.length <= 0">
      Никакой Информации нету!
    </div>
  </div>
</template>

<script>
export default {
  name: "bot-info",
  props: {
    infos: {
      type: Array,
      default: () => [],
    },
  },
};
</script>

<style scoped lang="scss"></style>
