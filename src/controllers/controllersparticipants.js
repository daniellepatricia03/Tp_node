
import { readFile , writeFile } from 'fs/promises';

const filepath = './data/participants.json'; // pour recuperer les données des participants 

// pour recupérer tous les participants
export const getParticipants = async(req, res) => {
    try {
        const data = await readFile(filepath, 'utf-8');
        const participants = JSON.parse(data);
        if (participants.length === 0) {
            return res.status(404).json({ error: 'Aucun participant trouvé' });
        }
        res.status(200).json(participants); 
    } catch (error) {
        res.status(500).json({ error: 'Erreur serveur', detail: error.message });
    }
};

// pour recupérer un participant par son ID
export const getParticipantById = async(req, res) => {
    try {
        const data = await readFile(filepath, 'utf-8');
        const participants = JSON.parse(data);
        const participant = participants.find(p => p.id === parseInt(req.params.id));
        if (!participant) {
            return res.status(404).json({ error: 'Participant non trouvé' });
        }
        res.status(200).json(participant);
    } catch (error) {
        res.status(500).json({ error: 'Erreur serveur', detail: error.message });
    }
};

//  pour créer un nouveau participant
export const createParticipant = async(req, res) => {
    try {
        const { name, email } = req.body;

        if (!name || !email) {
            return res.status(400).json({ error: 'name et email sont requis' });
        }
        const data = await readFile(filepath, 'utf-8');
        const participants = JSON.parse(data);

        const newParticipant = {
            id: participants.length > 0 ? Math.max(...participants.map(p => p.id)) + 1 : 1,
            name,
            email
        };

        participants.push(newParticipant); 
        await writeFile(filepath, JSON.stringify(participants, null, 2));
        res.status(201).json(newParticipant);
    } catch (error) {
        res.status(500).json({ error: 'Erreur serveur', detail: error.message });
    }
};


// pour modifier un participant existant
export const updateParticipant = async (req, res) => {
    try {
        const id = parseInt(req.params.id);
        const data = await readFile(filepath, 'utf-8');
        const participants = JSON.parse(data);
        const index = participants.findIndex(p => p.id === id); // on cherche le participant

        if (index === -1) {
            return res.status(404).json({ error: 'Participant non trouvé' });
        }

        participants[index] = { ...participants[index], ...req.body }; // on met à jour
        await writeFile(filepath, JSON.stringify(participants, null, 2));
        res.status(200).json(participants[index]);
    } catch (error) {
        res.status(500).json({ error: 'Erreur serveur', detail: error.message });
    }
};

//pour supprimer un participant
export const deleteParticipant = async (req, res) => {
    try {
        const id = parseInt(req.params.id);
        const data = await readFile(filepath, 'utf-8');
        const participants = JSON.parse(data);
        const index = participants.findIndex(p => p.id === id); // on vérifie qu'il existe

        if (index === -1) {
            return res.status(404).json({ error: 'Participant non trouvé' });
        }

        participants.splice(index, 1); // on supprime
        await writeFile(filepath, JSON.stringify(participants, null, 2));
        res.status(200).send("participant supprimé avec succès");
    } catch (error) {
        res.status(500).json({ error: 'Erreur serveur', detail: error.message });
    }
};