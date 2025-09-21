

import { validationResult } from 'express-validator'
import Latest from '../models/latest.js'

export const getAllLatest = async (req, res, next) =>{
    try {
        const data = await Latest.find({})
        res.status(201).json({
            status: true,
            message: '',
            data
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({
            status: false,
            message: 'Internal server error',
            data: null
        })
    }
}

export const addLatest = async (req, res, next) => {
    try {
        const error = validationResult(req)
        if (!error.isEmpty()) {
            res.status(400).json({
                status: false,
                message: 'Validation error',
                data: null
            })
        } else {
            const { image, title, bedroom, washroom, area, category } = req.body



            const newEntry = new Latest({
                image,
                title,
                bedroom,
                washroom,
                area,
                category
            })
            await newEntry.save()
            
            res.status(200).json({
                status: true,
                message: 'Latest created successfully',
                data: null
            })
        }
        
    } catch (error) {
        console.log(error)
        res.status(500).json({
            status: false,
            message: 'Internal server error',
            data: null
        })
    }
}

export const deleteLatest = async (req, res, next) => {
    try {
        const {id} = req.params;
        const deleteData = await Latest.findByIdAndDelete(id);
        if(!deleteData){
            res.status(404).json({
                status: false,
                message:"data not found",
                data: null

            })
        } else {
            res.status(200).json({
                status: true,
                message: "deleted successfully",
                data : deleteData
            })
        }
    }catch(error) {
        console.log(error)
        res.status(500).json({
            status: false,
            message: 'Internal server error',
            data: null
        })
    }
};