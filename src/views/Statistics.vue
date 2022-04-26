<template>
  <div>
    <layout>
      <Tabs class-prefix="type" :data-source="typeList" :value.sync="type"/>
      <Tabs class-prefix="interval" :data-source="intervalList" :value.sync="interval"/>
      <div>
        <ol>
          <li v-for="(group,index) in result" :key="index">
            <h3 class="title">{{ group.title }}</h3>
            <ol>
              <li class="record" v-for="item in group.items" :key="item.createdAt">
                <span> {{ tagString(item.tags) }}</span>
                <span class="notes">{{item.notes}}</span>
                <span> ￥{{ item.amount }} </span>
              </li>
            </ol>
          </li>
        </ol>
      </div>
    </layout>
  </div>
</template>

<script lang="ts">
  import Vue from 'vue';
  import {Component} from 'vue-property-decorator';
  import Tabs from '@/components/Tabs.vue';
  import intervalList from '@/constants/intervalList';
  import typeList from '@/constants/typeList';
  
  @Component({
    components: {Tabs}
  })
  export default class Statistics extends Vue {
    tagString(tags: Tag[]) {
      return tags.length === 0 ? '无' : tags.join(',');
    }
    
    get recordList() {
      // eslint-disable-next-line no-undef
      return (this.$store.state as RootState).recordList;
    }
    
    get result() {
      const {recordList} = this;
      type HashTableValue = { title: string, items: RecordItem[]; }
      const hashTable: { [key: string]: HashTableValue } = {};
      for (let i = 0; i < recordList.length; i++) {
        const [date, time] = recordList[i].createdAt!.split('T');
        hashTable[date] = hashTable[date] || {title: date, items: []};
        hashTable[date].items.push(recordList[i]);
      }
      console.log(hashTable);
      return hashTable;
    }
    
    beforeCreate() {
      this.$store.commit('fetchRecords');
    }
    
    type = '-';
    interval = 'day';
    intervalList = intervalList;
    typeList = typeList;
  }
</script>

<style lang="scss" scoped>
  %item {
    padding: 8px 16px;
    line-height: 24px;
    display: flex;
    justify-content: space-between;
    align-content: center;
  }
  
  .title {
    padding: 0 16px;
    @extend %item
    
  }
  
  .record {
    background: white;
    @extend %item
  }
  
  ::v-deep {
    .type-tabs-item {
      background: white;
      
      &.selected {
        background: #c4c4c4;
        
        &::after {
          display: none;
        }
      }
    }
    
    .interval-tabs-item {
      height: 48px;
    }
    .notes{
      margin-right: auto;
      margin-left: 16px;
      color: #999;
    }
  }
</style>