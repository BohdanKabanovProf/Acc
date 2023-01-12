import { Router } from "express";

const router = new Router();

router.get('/test', (reqm, res) => {
    console.log('test')
})

export default router;