import DB from "../database/db.js";

let Sequelize = DB.Sequelize;
let Model = DB.SModel;

export const UserMeta = Model.define('user_metas', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
   
    user_id: {
        type: Sequelize.INTEGER
    },

    parent_id: {
        type: Sequelize.INTEGER,
    },

    referral_id: {
        type: Sequelize.STRING,
    },

    sponser_id: {
        type: Sequelize.STRING,
    },

    path_by_id: {
        type: Sequelize.TEXT,
        defaultValue: ""
    },

    // Income Related META

    total_income: {
        type: Sequelize.DECIMAL(30,5),
        defaultValue: "0",
        comment: "Total Income in USDT"
    },

    total_earned: {
        type: Sequelize.DECIMAL(30,5),
        defaultValue: "0",
        comment: "Total Earned in CVT"
    },

    total_withdraw: {
        type: Sequelize.DECIMAL(30,5),
        defaultValue: "0",
        comment: "Total Withdraw in CVT"
    },

    total_withdraw_usdt: {
        type: Sequelize.DECIMAL(30,5),
        defaultValue: "0",
        comment: "Total Withdraw in USDT"
    },

    

    total_deposit: {
        type: Sequelize.DECIMAL(30,5),
        defaultValue: "0"
    },

    total_direct_members: {
        type: Sequelize.INTEGER.UNSIGNED,
        defaultValue: 0
    },

    total_team_members: {
        type: Sequelize.INTEGER.UNSIGNED,
        defaultValue: 0
    },

    total_balanced_tree_members: {
        type: Sequelize.INTEGER.UNSIGNED,
        defaultValue: 0
    },

    total_team_business: {
        type: Sequelize.DECIMAL(30,5),
        defaultValue: 0,
        comment: "Total Team Business in USDT"
    },
    total_self_business: {
        type: Sequelize.DECIMAL(30,5),
        defaultValue: 0,
        comment: "Total Self Business in USDT"
    },

    // ----------------------

    total_staked: {
        type: Sequelize.DECIMAL(30,5),
        defaultValue: "0",
        comment: "Total Staked in CVT"
    },

    total_earning_limit: {
        type: Sequelize.DECIMAL(30,5),
        defaultValue: "0",
        comment: "Total Earning Limit in CVT"
    },

    total_unstaked: {
        type: Sequelize.DECIMAL(30,5),
        defaultValue: "0",
        comment: "Total Unstaked in CVT"
    },

    total_direct_income: {
        type: Sequelize.DECIMAL(30,5),
        defaultValue: "0",
        comment: "Total Direct Income in CVT"
    },

    total_roi_income: {
        type: Sequelize.DECIMAL(30,5),
        defaultValue: "0"
    },

    total_star_club_bonus_income_cvt: {
        type: Sequelize.DECIMAL(30,5),
        defaultValue: "0",
        comment: "Total Star Club Bonus Income in CVT"
    },

    total_leader_ship_rewards: {
        type: Sequelize.DECIMAL(30,5),
        defaultValue: "0"
    },

    total_founders_plan_income_cvt: {
        type: Sequelize.DECIMAL(30,5),
        defaultValue: "0",
        comment: "Founders Plan Income in CVT"
    },

    total_founders_plan_income_usdt: {
        type: Sequelize.DECIMAL(30,5),
        defaultValue: "0",
        comment: "Founders Plan Income in USDT"
    },

    total_eps_plan_income_usdt: {
        type: Sequelize.DECIMAL(30,5),
        defaultValue: "0",
        comment: "Eps Plan Income in USDT"
    },

    total_level_income: {
        type: Sequelize.DECIMAL(30,5),
        defaultValue: "0",
        comment: "Total Level Income in CVT"
    },

    user_rank: {
        type: Sequelize.INTEGER,
        defaultValue: 0
    },

    total_retopup_income: {
        type: Sequelize.DECIMAL(30,5),
        defaultValue: "0",
        comment: "Total Retopup Income in CVT"
    }



}, {
    underscored: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at'
});
