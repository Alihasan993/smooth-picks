import { faLayerGroup, faPlus, faUserPlus, faUsers,faCartShopping} from "@fortawesome/free-solid-svg-icons";
export const link=[
    {
        name:'Users',
        path:'users',
        icon:faUsers,
        role:['1995']
    },
     {
        name:'Add User',
        path:'user/add',
        icon:faUserPlus,
        role:['1995']
    },
      {
        name:'Categories',
        path:'categories',
        icon:faLayerGroup,
        role:['1999','1995']
    },
      {
        name:'Add Category',
        path:'category/add',
        icon:faPlus,
        role:['1999','1995']
    },
      {
      name:'Products',
      path:'products',
      icon:faCartShopping,
      role:['1999','1995']
    },
    {
      name:'Add Product',
      path:'product/add',
      icon:faPlus,
      role:['1999','1995']
    },
]

