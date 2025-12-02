import supabase from "../config.js";

// Modelo de reformas
export class ReformModel {
    // Método para obtener todas las reformas
    static async getAll() {
        const { data, error } = await supabase
            .from("reform")
            .select("*, architects(name)")
            .order("year", { ascending: false });

        if (error) throw error;
        return data;
    }

    // Método para obtener una reforma por ID
    static async getById(id) {
        const { data, error } = await supabase
            .from("reform")
            .select("*")
            .eq("id_reform", id)
            .single();

        if (error) throw error;
        return data;
    }

    // Método para crear una reforma
    static async create(data) {
        const { error } = await supabase
            .from("reform")
            .insert([data]);

        if (error) throw error;
        return true;
    }

    // Método para actualizar una reforma
    static async update(id, data) {
        const { error } = await supabase
            .from("reform")
            .update(data)
            .eq("id_reform", id);

        if (error) throw error;
        return true;
    }

    // Método para eliminar una reforma
    static async delete(id) {
        const { error } = await supabase
            .from("reform")
            .delete()
            .eq("id_reform", id);

        if (error) throw error;
        return true;
    }
}