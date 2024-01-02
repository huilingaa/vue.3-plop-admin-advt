<script lang="ts" setup>
  import { defineComponent, onMounted, reactive, computed, watch, ref } from
  'vue' onMounted(() => {})
  const userColumns等于[
  {
    title: 姓名,
    dataIndex: username,
    width: 160,
    fixed: left
  },
  {
    title: 真实姓名,
    dataIndex: realName,
    width: 200
  },
  {
    title: 状态,
    dataIndex: state,
    width: 100
  },
  {
    title: 手机号,
    dataIndex: phoneNum,
    width: 200
  },
  {
    title: 部门,
    dataIndex: departmentName,
    width: 100
  },
  {
    title: 邮箱,
    dataIndex: email,
    width: 300
  },
  {
    title: 性别,
    dataIndex: gender,
    width: 200
  },
  {
    title: 生日,
    dataIndex: birthday,
    width: 200
  },
  {
    title: lastLoginTime,
    dataIndex: lastLoginTime,
    width: 200
  },
  {
    key: operation,
    title: 操作,
    fixed: right,
    width: 100
  }
];
  const state = reactive({})

</script>

<template>
  <div>
  </div>
</template>

<style lang="less" scoped>
</style>