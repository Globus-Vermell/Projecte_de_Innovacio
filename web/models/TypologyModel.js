import supabase from "../config.js";

// Modelo de tipología
export class TypologyModel {
    // Método para obtener todas las tipologías
    static async getAll() {
        const { data, error } = await supabase
            .from("typology")
            .select("*")
            .order("name");

        if (error) throw error;
        return data;
    }

    // Método para obtener una tipología por ID
    static async getById(id) {
        const { data, error } = await supabase
            .from("typology")
            .select("*")
            .eq("id_typology", id)
            .single();

        if (error) throw error;
        return data;
    }

    // Método para crear una tipología
    static async create(data) {
        const { error } = await supabase
            .from("typology")
            .insert([data]);

        if (error) throw error;
        return true;
    }

    // Método para actualizar una tipología
    static async update(id, data) {
        const { error } = await supabase
            .from("typology")
            .update(data)
            .eq("id_typology", id);

        if (error) throw error;
        return true;
    }

    // Método para eliminar una tipología
    static async delete(id) {
        const { error } = await supabase
            .from("typology")
            .delete()
            .eq("id_typology", id);

        if (error) throw error;
        return true;
    }
}