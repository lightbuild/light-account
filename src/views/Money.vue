<template>
  <Layout class-prefix="layout">
    <NumberPad/>
    <Notes/>
    <Types/>
    <Tags :data-source="tags"/>
  </Layout>
</template>

<script lang="js">
  import NumberPad from '@/components/Money/NumberPad.vue';
  import Tags from '@/components/Money/Tags.vue';
  import Types from '@/components/Money/Types.vue';
  import Notes from '@/components/Money/Notes.vue';
  export default {
    name: 'Money',
    components: {Notes, Types, Tags, NumberPad},
    data(){
      return {
        tags:['衣','食','住','行','医疗']
      }
    }
  };
</script>

<style lang="scss">
  .layout-content {
    display: flex;
    flex-direction: column-reverse;
  }
</style>