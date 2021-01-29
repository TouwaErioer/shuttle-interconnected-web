<template>
    <div>
        <Headers :color="color">
            <span><i :class="icon"></i> {{title}}</span>
        </Headers>
        <div class="content">
            <div class="filters">
                <div class="filter">
                    <span @click="options['1'] = !options['1']">
                        排序 <i :class="options['1']?'el-icon-arrow-down':'el-icon-caret-bottom'"></i>
                    </span>
                </div>
                <div class="filter">
                    <span @click="options['2'] = !options['2']">
                        筛选 <i :class="options['2']?'el-icon-arrow-down':'el-icon-caret-bottom'"></i>
                    </span>
                </div>
                <div class="filter">
                    <span @click="options['3'] = !options['3']">
                        高级 <i :class="options['3']?'el-icon-arrow-down':'el-icon-caret-bottom'"></i>
                    </span>
                </div>
            </div>

            <el-collapse-transition>
                <div class="options" v-show="options['1']">
                    <el-radio-group v-model="sort" @change="sortStores()">
                        <el-radio-button label="1">
                            <i class="el-icon-price-tag"></i><span> 名称</span>
                        </el-radio-button>
                        <el-radio-button label="2">
                            <i class="el-icon-star-off"></i><span> 评分</span>
                        </el-radio-button>
                        <el-radio-button label="3">
                            <i class="el-icon-medal"></i><span> 销量</span>
                        </el-radio-button>
                    </el-radio-group>
                </div>
            </el-collapse-transition>
            <el-collapse-transition>
                <div class="options" v-show="options['2']">
                    <el-radio-group v-model="filter" @change="filterStores()">
                        <el-radio-button v-for="category in categories" :key="category" :label="category">
                            <span v-text="category"></span>
                        </el-radio-button>
                    </el-radio-group>
                </div>
            </el-collapse-transition>
            <el-collapse-transition>
                <div class="options" v-show="options['3']">
                    <el-radio-group v-model="advanced" @change="advancedStores()">
                        <el-radio-button label="1">
                            <span> 默认</span>
                        </el-radio-button>
                        <el-radio-button label="2">
                            <span> 重置</span>
                        </el-radio-button>
                    </el-radio-group>
                </div>
            </el-collapse-transition>
            <div class="stores">
                <Item v-for="store in stores" :key="store.id" :item="store"/>
            </div>
        </div>
    </div>
</template>

<script>
    import Headers from "@/components/headers";
    import mock from "@/mock";
    import Item from "@/components/item";

    export default {
        name: "stores",
        props: ['id'],
        components: {Item, Headers},
        data() {
            return {
                title: null,
                icon: null,
                color: null,
                stores: [],
                activeIndex: '1',
                options: {
                    '1': false,
                    '2': false,
                    '3': false
                },
                sort: '1',
                filter: null,
                advanced: '1',
                categories: []
            }
        },
        created() {
            let stores = this.$store.state.services.get(parseInt(this.id))
            this.stores = mock.stores()
            this.categories = mock.category(this.id)
            this.filter = this.categories[0]
            this.title = stores['name']
            this.icon = stores['icon']
            this.color = stores['color']
        },
        methods: {
            sortStores() {
                if (this.sort == '1') {
                    this.stores = mock.stores()
                } else if (this.sort == '2') {
                    this.stores.sort((a, b) => b.rate - a.rate)
                } else if (this.sort == '3') {
                    this.stores.sort((a, b) => b.sales - a.sales)
                }
            },
            filterStores() {
                const stores = mock.stores()
                this.stores = stores.filter(store => store.category == this.filter)
            },
            advancedStores() {
                if (this.advanced == '2') {
                    this.stores = mock.stores()
                }
            }
        }
    }
</script>

<style scoped>
    .stores {
    }

    .content {
        margin: 38px 10px;
    }

    .filters {
        height: 30px;
        width: 100%;
        display: flex;
        justify-content: center;
    }

    .filter {
        width: 30%;
        margin: 0 10px;
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: 3vh;
        color: #606266;
    }

    .options {
        width: 100%;
        display: flex;
        justify-content: center;
        padding: 10px 0;
    }

    .option {
        height: 30px;
        margin-left: 2vh;
        font-size: 3vh;
        color: #606266;
        line-height: 30px;
        width: 20%;
    }

</style>