const mysql = require('mysql');
const crypto = require("crypto");


const HOST = '127.0.0.1'
const PORT = 3306
const USER = 'root'
const PASSWORD = 'root'
const DATABASE = 'lytest'

const UserId = process.argv[2]

class MysqlKit {
    constructor(options) {
        this.pool = mysql.createPool(options)
    }

    async initTable() {
        let res = await this.exec(`
            CREATE TABLE test_claim (
  f_id bigint(20) unsigned NOT NULL AUTO_INCREMENT COMMENT '自增id',
  f_rowkey varchar(32) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '' COMMENT 'rowkey',
  f_create_time timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  f_update_time timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
  f_init_time timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '入库时间',
  f_claim_time timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '领单时间',
  f_origin int(11) NOT NULL DEFAULT '-1' COMMENT '渠道 0-无 1 看点 2 NOW 3 微视 4 日迹 5 企鹅电竞 6 空间 7 看点UGC',
  f_submit_type int(11) NOT NULL DEFAULT '-1' COMMENT '发布类型 platform_src=1时 1粉丝 2 看点+粉丝',
  f_type int(11) NOT NULL DEFAULT '-1' COMMENT '素材类型 1代表图文 2代表视频',
  f_review_type varchar(32) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '' COMMENT '审核类型 安审-safe_review 举报-report_review 复审-pop_review 异步送审-async_review',
  f_status int(10) unsigned NOT NULL DEFAULT '0' COMMENT '领单状态 0-未领单 1-已领单 2-已审核 3-挂起',
  f_prior int(10) unsigned NOT NULL DEFAULT '0' COMMENT '优先级 0-无优先',
  f_audit_status int(10) unsigned NOT NULL DEFAULT '0' COMMENT '审核结果状态 0-审核不通过 1-审核通过',
  f_source int(11) NOT NULL DEFAULT '-1' COMMENT '一级来源',
  f_sec_source int(11) NOT NULL DEFAULT '-1' COMMENT '二级来源',
  f_chann_id varchar(32) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '-1' COMMENT '一级分类',
  f_sec_chann_id varchar(32) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '-1' COMMENT '二级分类',
  f_trd_chann_id varchar(32) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '-1' COMMENT '三级分类',
  f_staff_id varchar(64) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '' COMMENT '领单人员id',
  f_account_id varchar(64) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '' COMMENT '账号id',
  f_account_name varchar(64) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '' COMMENT '账号名称',
  f_title varchar(64) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '' COMMENT '标题',
  f_url varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '' COMMENT '内容链接',
  f_weight int(10) unsigned NOT NULL DEFAULT '0' COMMENT '优先级权重 0-无优先',
  f_ext bigint(20) NOT NULL DEFAULT '0' COMMENT '预留整型字段',
  f_ext_str text COLLATE utf8mb4_unicode_ci NOT NULL COMMENT '预留字符字段',
  PRIMARY KEY (f_id,f_create_time),
  KEY idx_staff (f_staff_id),
  KEY idx_rowkey_crt (f_rowkey,f_create_time)
) ENGINE=InnoDB AUTO_INCREMENT=2262722 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='审核领单表';
`)
        console.log(`init success`)
        console.log(res.results);
        return res
    }

    async batchInsert(num) {
        for (let i = 0; i < num; i++) {
            await mysqlKit.exec('INSERT INTO test_claim (f_rowkey, f_ext_str) VALUES (?, "")', mysqlKit.getRowkey());
        }
    }
    getRowkey() {
        return crypto.randomBytes(16).toString("hex");
    }

    exec(query, values) {
        return new Promise((resolve, reject) => {
            this.pool.query(query, values, (error, results, fields) => {
                if (error) { return reject(error) }
                resolve({ results: results, fields: fields })
            })
        })
    }

    async insert(query, values) {
        return this.exec(query, values);
    }

    async claim(staffId) {
        return new Promise((resolve, reject) => {
            this.pool.getConnection((error, connection) => {
                if (error) {
                    return reject(error)
                }
                let startTime = Date.now()
                connection.query('SELECT f_id FROM test_claim WHERE f_create_time > ? AND f_create_time < ? AND f_status=0 ORDER BY f_id DESC limit 10', ['2019-08-29 13:27:00', '2019-08-29 13:36:00'], (error, results, fields) => {
                    if (error) {
                        connection.release();
                        return reject(error);
                    }
                    let ids = results.map((item) => { return item.f_id })
                    console.log(`[${new Date().toString()}] staffId:${staffId}, cost:${Date.now() - startTime}ms, claimed:${ids.join(',')}`)
                    if (ids.length === 0) {
                        connection.release();
                        return resolve([]);
                    }
                    startTime = Date.now()
                    connection.query('UPDATE test_claim SET f_status = 1, f_staff_id = ? WHERE f_id IN (?)', [staffId, ids], (error, results, fields) => {
                        connection.release();
                        if (error) {
                            return reject(error);
                        }
                        console.log(`[${new Date().toString()}] staffId:${staffId}, cost:${Date.now() - startTime}ms, updated:${ids.join(',')}`)
                        resolve(results)
                    })
                })
            })
        })
    }

    async claimExclusiveTransaction(staffId) {
        return new Promise((resolve, reject) => {
            this.pool.getConnection((error, connection) => {
                if (error) {
                    return reject(error)
                }

                connection.beginTransaction((error) => {
                    if (error) {
                        return reject(error);
                    }
                    let startTime = Date.now()
                    connection.query('SELECT f_id FROM test_claim WHERE f_create_time > ? AND f_create_time < ? AND f_status=0 ORDER BY f_id DESC limit 10 FOR UPDATE', ['2019-08-29 13:27:00', '2019-08-29 13:36:00'], (error, results, fields) => {
                        if (error) {
                            return connection.rollback(() => {
                                return reject(error);
                            })
                        }
                        let ids = results.map((item) => { return item.f_id })
                        console.log(`[${new Date().toString()}] staffId:${staffId}, cost:${Date.now() - startTime}ms, claimed:${ids.join(',')}`)
                        if (ids.length === 0) {
                            connection.release();
                            return resolve([]);
                        }
                        startTime = Date.now()
                        connection.query('UPDATE test_claim SET f_status = 1, f_staff_id = ? WHERE f_id IN (?)', [staffId, ids], (error, results, fields) => {
                            if (error) {
                                return connection.rollback(() => {
                                    return reject(error);
                                })
                            }

                            connection.commit((error) => {
                                if (error) {
                                    return connection.rollback(() => {
                                        return reject(error);
                                    })
                                }
                                console.log(`[${new Date().toString()}] staffId:${staffId}, cost:${Date.now() - startTime}ms, updated:${ids.join(',')}`)
                                resolve(results)
                            })
                        })
                    })
                })
            })
        })
    }

    async claimOptimistic(staffId) {
        return new Promise((resolve, reject) => {
            this.pool.getConnection((error, connection) => {
                if (error) {
                    return reject(error)
                }

                connection.beginTransaction((error) => {
                    if (error) {
                        return reject(error);
                    }
                    let startTime = Date.now()
                    connection.query('SELECT f_id FROM test_claim WHERE f_create_time > ? AND f_create_time < ? AND f_status=0 ORDER BY f_id DESC limit 10', ['2019-08-29 13:27:00', '2019-08-29 13:36:00'], (error, results, fields) => {
                        if (error) {
                            return connection.rollback(() => {
                                return reject(error);
                            })
                        }
                        let ids = results.map((item) => { return item.f_id })
                        console.log(`[${new Date().toString()}] staffId:${staffId}, cost:${Date.now() - startTime}ms, claimed:${ids.join(',')}`)
                        if (ids.length === 0) {
                            connection.release();
                            return resolve([]);
                        }
                        startTime = Date.now()
                        connection.query('UPDATE test_claim SET f_status = 1, f_staff_id = ? WHERE f_id IN (?) AND f_status=0', [staffId, ids], (error, results, fields) => {
                            if (error) {
                                return connection.rollback(() => {
                                    return reject(error);
                                })
                            }

                            connection.commit((error) => {
                                if (error) {
                                    return connection.rollback(() => {
                                        return reject(error);
                                    })
                                }
                                console.log(`[${new Date().toString()}] staffId:${staffId}, cost:${Date.now() - startTime}ms, updated:${ids.join(',')}, succeed:${results.affectedRows}`)
                                resolve(results)
                            })
                        })
                    })
                })
            })
        })
    }

    async release(ids) {
        let res = await this.exec('UPDATE test_claim SET f_status = 0 WHERE f_id IN (?)', [ids]);
        console.log(res)
    }
}


(async function () {
    try {
        let mysqlKit = new MysqlKit({ host: HOST, port: PORT, user: USER, password: PASSWORD, database: DATABASE })
        // await mysqlKit.batchInsert(1000000)
        // await mysqlKit.release([1,2,3])

        // await mysqlKit.claim(UserId)
        await mysqlKit.claimOptimistic(UserId)

    } catch (err) {
        console.error(err)
    }
    process.exit(0)
})()


