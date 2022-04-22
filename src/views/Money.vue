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
    <Tags @update:value="onUpdateValue"/>
  </Layout>
</template>

<script lang="ts">
  import NumberPad from '@/components/Money/NumberPad.vue';
  import Tags from '@/components/Money/Tags.vue';
  import Types from '@/components/Money/Types.vue';
  import FormItem from '@/components/Money/FormItem.vue';
  import Vue from 'vue';
  import {Component} from 'vue-property-decorator';
  import store from '@/store/index2';
  
  
  @Component({
    components: {FormItem, Types, Tags, NumberPad},
    computed:{
      recordList(){
        return store.recordList
      }
    }
  })
  export default class Money extends Vue {
    record: RecordItem = {
      tags: [],
      notes: '',
      type: '-',
      amount: 0
    };
    
    onUpdateNotes(value: string) {
      this.record.notes = value;
    }
    onUpdateValue(value:string){
      this.record.tags = value;
    }
    saveRecord() {
      store.createRecord(this.record);
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