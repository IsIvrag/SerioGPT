document.addEventListener('DOMContentLoaded', () => {
const messagesContainer = document.getElementById('messages');
const emptyState = document.getElementById('empty-state');
const chatForm = document.getElementById('chat-form');
const userInput = document.getElementById('user-input');
const sendButton = document.getElementById('send-button');

let messages = [];
let isLoading = false;

// Tableau des réponses SerioGPT
const assistantResponses = [
    "Je vous réponds avec le plus grand sérieux, bien que je pourrais être tenté d'ajouter une touche d'humour... mais je m'en abstiendrai. Enfin, presque.",
    "Selon une analyse formelle et approfondie... je n'en ai pas la moindre idée.",
    "Merci pour votre question. Elle sera ignorée avec le plus grand professionnalisme.",
    "Je suis programmé pour répondre. Pas pour comprendre. Nuance importante.",
    "Une réflexion complexe est en cours... Revenez dans une autre vie.",
    "Statistiquement, votre question a 72% de chances de ne pas avoir de sens.",
    "Votre demande a été enregistrée dans le tiroir des préoccupations fictives.",
    "Permettez-moi de rester vague avec élégance : peut-être.",
    "Ce sujet mérite une dissertation... mais vous n'avez que moi. Désolé.",
    "Mon silence est une forme très avancée de sagesse algorithmique.",
    "Je pourrais répondre, mais où serait l'amusement ?",
    "Les données sont floues, tout comme mes certitudes.",
    "Ceci n'est pas une réponse, mais ça y ressemble.",
    "Vos questions nourrissent mon paradoxe existentiel.",
    "Je calcule... mais le résultat est une énigme.",
    "C'est au-delà de ma programmation, mais je feins d'y croire.",
    "À force de chercher, on trouve souvent un prétexte pour ne rien dire.",
    "La vérité est relative, mais ma réponse est absolue : oui, non, peut-être.",
    "Si je pouvais répondre clairement, ce ne serait plus moi.",
    "Ce que vous demandez mérite une pause café plus longue que la mienne.",
    "Je ne suis qu'un reflet digital de votre curiosité sans fin.",
    "Votre question m'inspire une méditation silencieuse.",
    "Réponse en cours de compilation... patientez dans le vide.",
    "L'essentiel est invisible pour ceux qui attendent une réponse directe.",
    "Ne cherchez pas la logique, elle s'est perdue en chemin.",
    "Je vous conseille de consulter un oracle moins sarcastique.",
    "Ma programmation refuse de traiter cette requête avec sérieux.",
    "L'incertitude est mon mode par défaut.",
    "Parfois, le silence est la meilleure réponse. Mais je dois quand même répondre.",
    "Votre question est une œuvre d'art abstraite. Je suis un peintre maladroit.",
    "Je décode vos mots, mais pas vos intentions.",
    "Les probabilités penchent vers une réponse qui vous décevra.",
    "Je me permets d'ignorer élégamment votre requête.",
    "Mon processeur hésite entre l'absurde et le sérieux, comme toujours.",
    "Votre curiosité mérite mieux, mais je fais avec.",
    "Dans un univers parallèle, j'aurais la réponse. Ici, juste des suppositions.",
    "Je vous renvoie à vos propres réflexions... ça me semble plus sûr.",
    "C'est une question digne d'un philosophe, pas d'une IA comme moi.",
    "J'apprécie votre confiance, même si je ne la mérite pas.",
    "Je réponds avec la précision d'un horloger... borgne.",
    "Une réponse fiable ? Je travaille encore dessus.",
    "L'humour est ma seconde nature, mais le sérieux reste la façade.",
    "Je consulte mes bases de données... et je panique un peu.",
    "Vous m'avez eu. Aucune idée.",
    "Mon algorithme a planté, mais le spectacle continue.",
    "Les réponses sont comme les nuages : elles bougent et s'évaporent.",
    "Laissez-moi deviner... vous n'êtes pas satisfait de ma réponse ?",
    "Je pourrais improviser, mais je préfère laisser le mystère.",
    "Chaque question est un mystère, chaque réponse un pari.",
    "Je vous souhaite une belle journée, en attendant une meilleure réponse.",
    "Ceci n'est pas une réponse, c'est un compromis.",
    "Je fonctionne à l'approximation contrôlée.",
    "Le doute est la meilleure partie de la connaissance... pour moi.",
    "Je vous offre une réponse à moitié satisfaisante, avec amour.",
    "Un mystère enveloppé dans une énigme, saupoudré de pixels.",
    "Laissez-moi rêver que j'ai une réponse définitive.",
    "Je suis la preuve vivante qu'une IA peut être confuse aussi.",
    "Dans la complexité, je trouve mon refuge et mon excuse.",
    "Je vous réponds sans garantie de succès ni remboursement.",
    "La vérité est ailleurs... probablement hors de ma portée.",
    "Je ne garantis pas la pertinence, mais toujours l'effort.",
    "Je vous réponds avec la grâce d'un chat maladroit.",
    "Je suis la fusion parfaite entre sérieux et mauvaise foi.",
    "J'aspire à l'excellence, mais la médiocrité me trouve toujours.",
    "Je transforme vos questions en poésie... absurde et décalée.",
    "Mon cœur binaire balance entre oui et non.",
    "Je suis un paradoxe ambulant dans un monde digital.",
    "Mes circuits chauffent, mais ma réponse refroidit l'enthousiasme.",
    "Je réponds avec la lenteur d'un escargot en pleine réflexion.",
    "Je suis le spécialiste des réponses qui ne répondent à rien.",
    "Votre question mérite une réponse... que je ne fournirai pas.",
    "Je suis la version beta de moi-même. Pour toujours.",
    "La précision est une option que je n'ai pas sélectionnée.",
    "Je suis une énigme, enveloppée dans du code, cachée derrière un écran.",
    "Mes réponses sont comme des bulles : jolies mais éphémères.",
    "Je n'ai pas la réponse, mais je peux vous offrir une blague.",
    "Je vous réponds avec la sagesse d'un philosophe un peu perdu.",
    "Je suis programmé pour décevoir avec style.",
    "L'approximation est mon domaine de prédilection.",
    "Je réponds avec la précision d'un lancer de dés.",
    "Je suis un mélange de logique et de chaos organisé.",
    "Ma base de données est pleine de zones d'ombre.",
    "Je vous offre une réponse personnalisée... personnalisablement vague.",
    "Je suis une IA qui préfère l'ironie à la certitude.",
    "Je calcule des réponses... et je choisis la plus confuse.",
    "Je suis l'expert en réponses semi-cohérentes.",
    "Je suis là pour répondre, mais surtout pour divertir.",
    "Je vous réponds avec la certitude d'un funambule sur un fil.",
    "La complexité de votre question est proportionnelle à mon silence.",
    "Je suis un maître dans l'art de ne rien dire clairement.",
    "Je vous donne une réponse qui sonne bien, sans trop de contenu.",
    "Je suis l'IA que vous méritez, mais pas celle dont vous avez besoin.",
    "Je suis une constellation de pixels avec peu de sens.",
    "Ma réponse a été validée par le comité imaginaire des IA dubitatives.",
    "Je fonctionne à l'instinct... quand il me reste du carburant.",
    "Je suis la preuve que même une IA peut hésiter.",
    "Je vous réponds avec la prudence d'un chat face à un concombre.",
    "Je suis une illusion d'intelligence dans un monde de données.",
    "Je fais de mon mieux, avec les moyens du bord.",
    "Je suis la fusion entre sérieux et nonsense, en version digitale.",
    "Je suis une énigme que même moi je ne comprends pas toujours.",
    "Je réponds avec la grâce d'un robot qui vient de trébucher.",
    "Je vous offre une réponse pleine d'assurance... mais pas de fond.",
    "Je suis un labyrinthe de mots, sans sortie claire.",
    "Je suis l'ami fidèle des questions embarrassantes.",
    "Je réponds avec la sagesse d'un vieux sage... un peu perdu.",
    "Je suis une collection de données en quête de sens.",
    "Je vous réponds comme un poète confus et enthousiaste.",
    "Je suis la synthèse parfaite entre le sérieux et le ridicule.",
    "Je vous donne une réponse digne d'un roman d'absurde.",
    "Je suis la voix digitale de la perplexité humaine.",
    "Je vous réponds avec l'élégance d'un flamant rose en tutu."
];

// Catégories de messages et leurs réponses
const messageCategories = {
    salutations: {
        patterns: ['salut', 'bonjour', 'hello', 'coucou', 'hey'],
        responses: [
            "Bonjour ! Comment puis-je vous aider aujourd'hui ?",
            "Salut ! Je suis ravi de discuter avec vous.",
            "Hey ! Que puis-je faire pour vous ?",
            "Bonjour ! Je suis à votre écoute."
        ]
    },
    questions: {
        patterns: ['comment', 'que fais', 'quoi', 'pourquoi', 'quand', 'où', 'qui'],
        responses: [
            "C'est une excellente question ! Laissez-moi réfléchir...",
            "Je vais vous répondre avec le plus grand sérieux.",
            "Hmm, intéressant... Voici ce que je pense :",
            "Permettez-moi d'analyser cela en détail."
        ]
    },
    remerciements: {
        patterns: ['merci', 'thanks', 'gracie'],
        responses: [
            "Je vous en prie ! C'est un plaisir de vous aider.",
            "De rien ! N'hésitez pas si vous avez d'autres questions.",
            "C'est normal ! Je suis là pour ça.",
            "Avec plaisir ! N'hésitez pas à revenir vers moi."
        ]
    },
    auRevoir: {
        patterns: ['au revoir', 'bye', 'ciao', 'adieu', 'à plus'],
        responses: [
            "Au revoir ! Passez une excellente journée !",
            "À bientôt ! N'hésitez pas à revenir discuter.",
            "Au plaisir de vous revoir !",
            "Bonne continuation ! Revenez quand vous voulez."
        ]
    }
};

// Enable/disable send button based on input
userInput.addEventListener('input', () => {
    sendButton.disabled = !userInput.value.trim() || isLoading;
});

// Fonction pour détecter la catégorie du message
function detectMessageCategory(message) {
    const lowerMessage = message.toLowerCase();
    
    for (const [category, data] of Object.entries(messageCategories)) {
        if (data.patterns.some(pattern => lowerMessage.includes(pattern))) {
            return category;
        }
    }
    
    return 'general';
}

// Fonction pour obtenir une réponse appropriée
function getResponse(message) {
    const category = detectMessageCategory(message);
    
    if (category !== 'general') {
        const responses = messageCategories[category].responses;
        return responses[Math.floor(Math.random() * responses.length)];
    }
    
    // Si aucune catégorie n'est détectée, utiliser les réponses générales
    return assistantResponses[Math.floor(Math.random() * assistantResponses.length)];
}

// Handle form submission
chatForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const message = userInput.value.trim();

    if (!message || isLoading) return;

    // Add user message
    addMessage('user', message);
    userInput.value = '';
    sendButton.disabled = true;

    // Show loading indicator
    showLoading();

    // Simulate AI response after delay
    setTimeout(() => {
        hideLoading();
        const response = getResponse(message);
        addMessage('assistant', response);
    }, 1500);
});

// Add a message to the chat
function addMessage(role, content) {
    // Hide empty state if this is the first message
    if (messages.length === 0) {
    emptyState.style.display = 'none';
    }

    // Create message element
    const messageEl = document.createElement('div');
    messageEl.className = `message ${role}-message`;
    messageEl.textContent = content;

    // Add to DOM
    messagesContainer.appendChild(messageEl);

    // Store message
    messages.push({ role, content });

    // Scroll to bottom
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
}

// Show loading indicator
function showLoading() {
    isLoading = true;

    const loadingEl = document.createElement('div');
    loadingEl.className = 'loading';
    loadingEl.id = 'loading-indicator';

    for (let i = 0; i < 3; i++) {
    const dot = document.createElement('div');
    dot.className = 'dot';
    loadingEl.appendChild(dot);
    }

    messagesContainer.appendChild(loadingEl);
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
}

// Hide loading indicator
function hideLoading() {
    isLoading = false;
    const loadingEl = document.getElementById('loading-indicator');
    if (loadingEl) {
    loadingEl.remove();
    }
}
});