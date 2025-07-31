const express = require('express');
const router = express.Router();
const Leave = require('../models/Leave');
const verfiyToken = require('../middlewares/authMiddleware');

//POST /api/leave -- apply of leave
router.post('/', verfiyToken, async(req, res) => {
    const {from, to ,reason} = req.body;

    try {
        const leave = new Leave({
            user: req.user.userId,
            from,
            to,
            reason
        })


        await leave.save();
        res.status(201).json({message: "Leave request submitted"});
    } catch (expection) {
        res.status(500).json({message: "Server error", error: expection.message});
    }
})


//GET /api/leave/mine
router.get('/mine', verfiyToken, async(req, res) => {
    try {
        const leaves = await Leave.find({user: req.user.userId});
        res.json(leaves);
    } catch (exprection) {
        res.status(500).json({message: 'Server error', error: exprection.message});
    }
})

// Get all leaves request (admin only)
router.get('/all', verfiyToken, async(req, res) =>{
    try {
        if(req.user.role !=='admin'){
            return res.status(403).json({message: 'Access denied'});
        }
        const leaves = await Leave.find().populate('user', 'username role');
        res.json(leaves);
    } catch (expection) {
        res.status(500).json({message: 'Server error', error: expection.message});
    }
});


//Aproved of Rejected Leave
router.put('/:id', verfiyToken, async (req, res) => {
    try {
    
        if(req.user.role !== 'admin'){
            return res.status(403).json({message: 'Only admin can change the status'});
        }
        const {status} = req.body;
        if(!['Approved', 'Rejected', 'Pending'].includes(status)){
            return res.status(400).json({message:'Invalid status value'});
        }

        const updateLeave = await Leave.findByIdAndUpdate(
            req.params.id,
            {status},
            {new: true}
        );

        if(!updateLeave){
            return res.status(404).json({message: 'Leave not found'});
        }

        res.json({ message: `Leave ${status.toLowerCase()}`, leave: updateLeave });

    } catch (expection) {
        res.status(500).json({message: 'Server error', error: expection.message});
    }
});

module.exports = router;