import { sitemapBuilder as buildSitemap, paramsApplier as applyParams } from 'react-router-sitemap';
import path from "path";
import fs from "fs";
import axios from "axios"
import keys from "../config/keys"

// console.log("****** WAITING FOR SERVER SETUP *****")

// wait 10sec for server setUp (For Dev Only)
// setTimeout(() => {

    const routes = ["/", "/draft", "/search", "/action", "/topic/:id", "/post/:id",
    "/talk", "/profile/:id", "/setting", "/setting/policy", "/setting/terms"]

    const hostname = 'https://www.indii.jp'; 

    const dest = path.resolve("./public", "sitemap.xml");

    const userReq = axios.get(`https://www.indii.jp/sitemap/user/${keys.SITEMAP_KEY}`)
    const postReq = axios.get(`https://www.indii.jp/sitemap/post/${keys.SITEMAP_KEY}`)
    const topicReq = axios.get(`https://www.indii.jp/sitemap/topic/${keys.SITEMAP_KEY}`)

    axios.all([userReq, postReq, topicReq])
    .then(axios.spread((...res) => {

        const config = {
            "/profile/:id": [
                { id: res[0].data }
            ],
            "/post/:id": [
                { id: res[1].data }
            ],
            "/topic/:id": [
                { id: res[2].data }
            ],
        }

        const paths = applyParams(routes, config);

        const sitemap = buildSitemap(hostname, paths);

        fs.writeFileSync(dest, sitemap.toString())

        console.log("****** CREATED SITEMAP *****")

    }))
    .catch(err => console.log(err))

// }, 5000) 



