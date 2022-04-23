<template>
    <layout>
      <div class="tags">
        <router-link class="tag" :to="`/labels/edit/${tag.id}`" v-for="tag in tags" :key="tag.id">
          <span>{{ tag.name }}</span>
            <Icon name="right"/>
        </router-link>
      <div class="createTag-wrapper">
        <Button @click.native="createTag">新建标签</Button>
      </div>
      </div>
    </layout>
</template>

<script lang="ts">
  import {Component} from 'vue-property-decorator';
  import Button from '@/components/Button.vue';
  import {mixins} from 'vue-class-component';
  import {tagHelper} from '@/lib/mixins/tagHelper';
  
  @Component({
    components: {Button},
  })
  export default class Labels extends mixins(tagHelper){
    get tags(){
      return this.$store.state.tagList;
    }
    beforeCreate(){
     this.$store.commit('fetchTags');
    }
  }
</script>

<style lang="scss" scoped>
  .tags {
    background: white;
    font-size: 20px;
    padding: 16px;
    
    > .tag {
      border-bottom: 1px solid #e6e6e6;
      min-height: 44px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      
      svg {
        width: 24px;
        height: 24px;
        color: #666;
        margin-right: 16px;
      }
    }
  }
  
  .createTag-wrapper {
      text-align: center;
      padding: 16px;
      margin-top: 28px;
    }
</style>