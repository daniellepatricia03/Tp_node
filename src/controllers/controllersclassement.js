import { readFile } from "fs/promises";


const filepath = "./data/participants.json"; // pour recuperer les données du classement


// pour effectuer le classement decroissant des participants
export const getclassements = async (req, res) => {
    try {
        const data = await readFile(filepath, "utf-8");
        const participants = JSON.parse(data);

        //  Trier par score décroissant
        const classement = participants.sort((a, b) => b.score - a.score);

        res.status(200).json(classement);
    } catch (error) {
        res.status(500).json({ error: "Erreur serveur", detail: error.message });
    }
};
