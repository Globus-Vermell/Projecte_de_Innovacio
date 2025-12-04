import { UserModel } from "../models/UserModel.js";
import { AppError } from "../utils/AppError.js";

export class UserController {
    static async index(req, res, next) {
        try {
            const page = parseInt(req.query.page) || 1;
            const limit = 15;
            const filters = { search: req.query.search || '' };

            const result = await UserModel.getAll(page, limit, filters);

            res.render("users/users", {
                users: result.data,
                pagination: result,
                currentFilters: filters
            });
        } catch (error) {
            next(error);
        }
    }

    static async formEdit(req, res, next) {
        const id = Number(req.params.id);
        try {
            const user = await UserModel.getById(id);
            res.render('users/usersEdit', { user });
        } catch (error) {
            next(error);
        }
    }

    static async update(req, res, next) {
        const id = Number(req.params.id);
        const { name, email, password, level } = req.body;

        try {
            await UserModel.update(id, {
                name,
                email,
                password,
                level
            });

            return res.json({ success: true, message: "Usuari actualitzat correctament!" });
        } catch (err) {
            next(err);
        }
    }

    static async formCreate(req, res, next) {
        res.render('users/usersForm');
    }

    static async create(req, res, next) {
        const { name, email, password, confirmPassword, level } = req.body;

        if (!name || !email || !password) {
            return next(new AppError("Nom, email i contrasenya són obligatoris", 400));
        }

        if (password !== confirmPassword) {
            return next(new AppError("Les contrasenyes no coincideixen", 400));
        }

        try {
            await UserModel.create({
                name,
                email,
                password,
                level
            });

            return res.json({ success: true, message: "Usuari creat correctament!" });
        } catch (err) {
            next(err);
        }
    }


    static async delete(req, res, next) {
        const id = Number(req.params.id);
        try {
            await UserModel.delete(id);
            return res.json({ success: true, message: "Usuari eliminat correctament!" });
        } catch (error) {
            next(error);
        }
    }
}