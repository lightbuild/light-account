<template>
  <div>
    <layout>
      <Tabs class-prefix="type" :data-source="typeList" :value.sync="type"/>
      <Tabs class-prefix="interval" :data-source="intervalList" :value.sync="interval"/>
      <div>
        <ol>
          <li v-for="(group,index) in groupedList" :key="index">
            <h3 class="title">{{ beautify(group.title) }}<span>￥{{group.total}}</span> </h3>
            <ol>
              <li class="record" v-for="item in group.items" :key="item.createdAt">
                <span> {{ tagString(item.tags) }}</span>
                <span class="notes">{{ item.notes }}</span>
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
  import dayjs from 'dayjs';
  import _ from 'lodash/fp';
  @Component({
    components: {Tabs}
  })
  export default class Statistics extends Vue {
    type = '-';
    interval = 'day';
    intervalList = intervalList;
    typeList = typeList;
    
    beautify(string: string) {
      const now = dayjs();
      const api = dayjs(string);
      if (api.isSame(now, 'day')) {
        return '今天';
        // eslint-disable-next-line no-constant-condition
      } else if (api.isSame(now.subtract(1, 'day'), 'day')) {
        return '昨天';
      } else if (api.isSame(now.subtract(2, 'day'), 'day')) {
        return '前天';
      } else {
        return api.format('YYYY年MM月DD');
      }
    }
    
    tagString(tags: Tag[]) {
      return tags.length === 0 ? '无' : tags.join(',');
    }
    
    get recordList() {
      // eslint-disable-next-line no-undef
      return (this.$store.state as RootState).recordList;
    }
    //计算属性
    get groupedList() {
      const {recordList} = this;
      if (recordList.length === 0) {return [];}
      const newList = _.cloneDeep(recordList).filter(r=>r.type === this.type).sort((a, b) => dayjs(b.createdAt).valueOf() - dayjs(a.createdAt).valueOf());
      type Result = {title:string,total?:number,items:RecordItem[]}[]
      const result:Result = [{title: dayjs(newList[0].createdAt).format('YYYY-MM-DD'),items: [newList[0]]}];
      for (let i = 0; i < newList.length; i++) {
        const current = newList[i];
        const last = result[result.length - 1];
        if (dayjs(last.title).isSame(dayjs((current.createdAt), 'day'))) {
          last.items.push(current);
        } else {
          result.push({title: dayjs(newList[0].createdAt).format('YYYY-MM-DD'),items: [current]});
        }
      }
      result.map(group => {
        group.total = group.items.reduce((sum,obj)=>sum+=obj.amount,0)
      })
      console.log(result);
      return result;
    }
    
    beforeCreate() {
      this.$store.commit('fetchRecords');
    }
    
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
    
    .notes {
      margin-right: auto;
      margin-left: 16px;
      color: #999;
    }
  }
</style>