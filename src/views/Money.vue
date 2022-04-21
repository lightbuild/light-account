<template>
  <Layout class-prefix="layout">
    {{ record }}
    <NumberPad :value.sync="record.amount" @submit="saveRecord"/>
    <Types :value.sync="record.type"/>
    <div class="note-wrapper">
      <FormItem field-name="备注"
                placeholder="在这里输入备注"
                @update:value="onUpdateNotes"/>
    </div>
    <Tags :data-source.sync="tags" @update:value="onUpdateTags"/>
  </Layout>
</template>

<script lang="ts">
  import NumberPad from '@/components/Money/NumberPad.vue';
  import Tags from '@/components/Money/Tags.vue';
  import Types from '@/components/Money/Types.vue';
  import FormItem from '@/components/Money/FormItem.vue';
  import Vue from 'vue';
  import {Component, Watch} from 'vue-property-decorator';
  import recordListModel from '@/models/recordListModel';
  import tagListModel from '@/models/tagListModel';
  
  const recordList = recordListModel.fetch();
  
  @Component({
    components: {FormItem, Types, Tags, NumberPad}
  })
  export default class Money extends Vue {
    tags = window.tagList;
    recordList: RecordItem[] = recordList;
    record: RecordItem = {
      tags: [],
      notes: '',
      type: '-',
      amount: 0
    };
    
    onUpdateTags(value: string[]) {
      this.record.tags = value;
    }
    
    onUpdateNotes(value: string) {
      this.record.notes = value;
    }
    
    saveRecord() {
      recordListModel.create(this.record);
    }
    
    @Watch('recordList')
    onRecordListChange() {
      recordListModel.save();
    }
  }
</script>

<style lang="scss">
  .note-wrapper {
    padding: 12px 0;
  }
  .layout-content {
    display: flex;
    flex-direction: column-reverse;
  }
</style>