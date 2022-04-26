<template>
  <Layout class-prefix="layout">
    {{ record }}
    <NumberPad :value.sync="record.amount" @submit="saveRecord"/>
    <Tabs :data-source="typeList" :value.sync="record.type" />
    <div class="note-wrapper">
      <FormItem field-name="备注"
                placeholder="在这里输入备注"
                @update:value="onUpdateNotes"/>
    </div>
    <Tags :value.sync="record.tags"/>
  </Layout>
</template>

<script lang="ts">
  import NumberPad from '@/components/Money/NumberPad.vue';
  import Tags from '@/components/Money/Tags.vue';
  import FormItem from '@/components/Money/FormItem.vue';
  import Vue from 'vue';
  import {Component} from 'vue-property-decorator';
  import Tabs from '@/components/Tabs.vue';
  import typeList from '@/constants/typeList';
  
  @Component({
    components: {Tabs, FormItem, Tags, NumberPad},
    created() {
      this.$store.commit('fetchRecords')
    }
  })
  export default class Money extends Vue {
    typeList = typeList
    get recordList(){
      return this.$store.state.recordList
    }
    record: RecordItem = {
      tags: [],
      notes: '',
      type: '-',
      amount: 0
    };
    onUpdateNotes(value: string) {
      this.record.notes = value;
    }
    saveRecord() {
      this.$store.commit('createRecord',this.record)
    }
  }
</script>

<style lang="scss" scoped>
  .note-wrapper {
    padding: 12px 0;
  }
  ::v-deep .layout-content {
    display: flex;
    flex-direction: column-reverse;
  }
</style>