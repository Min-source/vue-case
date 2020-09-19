import http from '../http'
export default {
    state: {
        name: "customer",
        list: [],
    },
    getters: {},
    mutations: {
        //重置list
        resetList(state, list) {
            state.list = list;
        }
    },
    actions: {
        //重载
        reloadData(context) {
            //axios替换jq
            http.get("/customer/findAll").then((resp) => {
                // console.log("response:",resp);
                //将查询到的数据通过mutations设置到state中
                context.commit("resetList", resp.data);

            })
        },
        //删除
        DeleteHandler(context, id) {
            this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
                confirmButtonText: "确定",
                cancelButtonText: "取消",
                type: "warning",
            })
                .then(() => {
                    http.get("/customer/deleteById",id).then((resp) => {
                        this.$message({
                            type: "success",
                            message: "删除成功!",
                        });
                        context.dispatch("reloadData");
                    })
                })
                .catch(() => {
                    this.$message({
                        type: "info",
                        message: "已取消删除",
                    });
                });
        },

    }
}