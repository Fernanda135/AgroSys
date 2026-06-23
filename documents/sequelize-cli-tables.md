```bash
# 1. USERS
npx sequelize-cli model:generate --name User --attributes name:string,email:string,password:string

# 2. AUTHTOKENS
npx sequelize-cli model:generate --name authToken --attributes user:integer,token:string,email:string

# 3. TODO
npx sequelize-cli model:generate --name ToDo --attributes user_id:integer,title:string,description:string,completed:boolean

# 4. PLANTATIONS
npx sequelize-cli model:generate --name Plantations --attributes user_id:integer,name:string,culture:string,plantingDate:date,harvestDate:date

# 5. STOCK
npx sequelize-cli model:generate --name Stock --attributes user_id:integer,product_name:string,category:string,quantity:integer,unit_price:decimal,unit:string

# 6. FINANCES
npx sequelize-cli model:generate --name Finances --attributes user_id:integer,isIncome:boolean,description:string,amount:decimal,transactionDate:date,category:string

# 7. AUDITLOG
npx sequelize-cli model:generate --name AuditLog --attributes user_id:integer,table_name:string,record_id:integer,action:string,old_values:json,new_values:json,ip_address:string,user_agent:string

```