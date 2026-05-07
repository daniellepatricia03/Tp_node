import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const challengesPath = path.join(__dirname, "../data/challenges.json");
const participantsPath = path.join(__dirname, "../../src/data/participants.json");


function readJSON(filePath) {
    return JSON.parse(fs.readFileSync(filePath, "utf-8"));
}

function writeJSON(filePath, data) {
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
}


// CREATE CHALLENGE  //

export const createChallenge = (req, res) => {
    const { title, difficulty, points } = req.body;

    if (!title || !difficulty || !points) {
        return res.status(400).json({ message: "Champs manquants" });
    }

    const challenges = readJSON(challengesPath);

    const newChallenge = {
        id: challenges.length + 1,
        title,
        difficulty,
        points
    };

    challenges.push(newChallenge);
    writeJSON(challengesPath, challenges);

    return res.status(201).json(newChallenge);
};


//  GET ALL CHALLENGES  //

export const getAllChallenges = (req, res) => {
    const challenges = readJSON(challengesPath);
    return res.json(challenges);
};


//  VALIDATion du  CHALLENGE  //

export const validateChallenge = (req, res) => {
    const challengeId = parseInt(req.params.id);
    const { participantId } = req.body;

    const challenges = readJSON(challengesPath);
    const participants = readJSON(participantsPath);

    //  trouver  un challenge  //
    const challenge = challenges.find(c => c.id === challengeId);
    if (!challenge) {
        return res.status(404).json({ message: "Challenge introuvable" });
    }

    //  trouver des participants  //
    const participant = participants.find(p => p.id === participantId);
    if (!participant) {
        return res.status(404).json({ message: "Participant introuvable" });
    }

    //  init score s //
    if (!participant.score) {
        participant.score = 0;
    }

    // ajout des points  //
    participant.score += challenge.points;

    // sauvegarde  des participants //
    writeJSON(participantsPath, participants);

    return res.status(200).json({
        message: "Défi validé avec succès",
        participant
    });
};