<template>
  <div>
    <el-table :data="nowTableData" border style="width: 100%">
      <el-table-column fixed prop="isHead" label="用户头像">
        <template slot-scope="scope">
          <img :src="scope.row.isHead" alt="" class="userHead">
        </template>
      </el-table-column>

      <el-table-column prop="username" label="姓名"></el-table-column>

      <el-table-column prop="email" label="邮箱"></el-table-column>

      <el-table-column prop="right" label="操作">
        <template slot-scope="scope">
          <el-button
            size="mini"
            @click="handleFreeze(scope.$index, scope.row)"
          >{{scope.row.isFreeze?"已冻结":"未冻结"}}</el-button>
          <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
        </template>
      </el-table-column>
      <!-- <el-table-column>
      <template slot-scope="scope">
        <el-button @click="handleClick(scope.row)" type="text" size="small">查看</el-button>
        <el-button type="text" size="small">编辑</el-button>
      </template>
      </el-table-column>-->
      
    </el-table>
    <el-pagination class="page"
        background
        layout="prev, pager, next"
        :page-size="pageSize"
        :current-page.sync="currentPage"
        :total="tableData.length">
   </el-pagination>
  </div>
</template>

<script>
export default {
    name:'user',
  data () {
    return{
    tableData:[],
    pageSize:3,
    currentPage:1
    }
  },
  mounted(){
   this.$axios.get("/api2/admin/usersList").then((res)=>{
       var status=res.data.status;
       if(status==0){
           this.tableData=res.data.data.usersList;
       }
   })
  },
  computed:{
   nowTableData(){ //nowTableData是计算属性（变化的）
     return this.tableData.slice((this.currentPage-1)*this.pageSize,this.currentPage*this.pageSize||[]);
   }
  },
  methods: {
handleFreeze(index,row){
  // console.log(index,row);
  this.$axios.post("/api2/admin/updateFreeze",{
    email:row.email,
    isFreeze:!row.isFreeze
  }).then((res)=>{
    var status=res.data.status;
    if(status==0){
   this.$alert('冻结操作成功', '信息', {
          confirmButtonText: '确定',
          callback: action => {
            row.isFreeze=!row.isFreeze;//tableData[index].isFreeze=!row.isFreeze
         }
        });
  }
  else{
    this.$alert('冻结操作失败', '信息', {
          confirmButtonText: '确定',
          callback: action => {
         }
        });
  }
  })
},
handleDelete(index,row){
  this.$axios.post('/api2/admin/deleteUser',{
    email:row.email
  }).then(res=>{
    var status=res.data.status;
    if(status==0){
      this.$alert('删除操作成功', '信息', {
          confirmButtonText: '确定',
          callback: action => {
            this.tableData.splice(index,1)
         }
        });
    }
    else{
      this.$alert('删除操作失败', '信息', {
          confirmButtonText: '确定',
          callback: action => {
         }
        });
    }
  })
}
  }
}
</script>

<style scoped>
.page{
 margin-top: 20px; 
}
.userHead{
  width:60px;
  height: 60px;
  border-radius: 50%;
  overflow: hidden;
}
</style>
