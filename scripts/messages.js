// Sidebar Toggle Functionality
const sidebarToggle = document.querySelector('.sidebar-toggle');
const sidebar = document.querySelector('.sidebar');
const closeBtn = document.querySelector('.close-btn');
const mainContent = document.querySelector('.main-content');

function toggleSidebar() {
    sidebar.classList.toggle('active');
    mainContent.style.marginLeft = sidebar.classList.contains('active') ? '250px' : '0';
}

sidebarToggle.addEventListener('click', toggleSidebar);
closeBtn.addEventListener('click', toggleSidebar);

// Close sidebar when clicking outside
document.addEventListener('click', (e) => {
    if (!sidebar.contains(e.target) && !sidebarToggle.contains(e.target)) {
        sidebar.classList.remove('active');
        mainContent.style.marginLeft = '0';
    }
});

// Chat List Functionality
const chatItems = document.querySelectorAll('.chat-item');
const chatPopup = document.querySelector('.chat-popup');
const closeChatBtn = document.querySelector('.close-chat-btn');
const chatMessages = document.querySelector('.chat-messages');
const chatInput = document.querySelector('.chat-input input');
const sendBtn = document.querySelector('.send-btn');

// Sample messages data (replace with actual data from backend)
const messages = {
    'shivani-sharma': [
        { text: 'Hi, I\'m interested in your skirt. Would you be interested in exchanging it for my tshirt?', sender: 'shivani-sharma', time: '10:30 AM' },
        { text: 'Hello! Sure, what would be suitable time to meet?', sender: 'me', time: '10:31 AM' }
    ],
    'mihika-singh': [
        { text: 'Yes, I\'m interested in your CAO Notes. Can we arrange a time to meet and exchange?', sender: 'mihika-singh', time: 'Yesterday' },
        { text: 'Hey! What are you willing to exchange for?', sender: 'me', time: 'Yesterday' }
    ],
    'rohit-kumar': [
        { text: 'Thanks for the exchange! I\'ll be available tomorrow afternoon if you\'re free.', sender: 'rohit-kumar', time: '2 days ago' },
        { text: 'You\'re welcome!', sender: 'me', time: '2 days ago' }
    ]
};

function openChat(userId, userName) {
    chatPopup.classList.add('active');
    document.querySelector('.chat-user-info h3').textContent = userName;
    loadMessages(userId);
}

function loadMessages(userId) {
    chatMessages.innerHTML = '';
    if (messages[userId]) {
        messages[userId].forEach(message => {
            const messageElement = createMessageElement(message);
            chatMessages.appendChild(messageElement);
        });
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }
}

function createMessageElement(message) {
    const div = document.createElement('div');
    div.className = `message ${message.sender === 'me' ? 'sent' : 'received'}`;
    div.textContent = message.text;
    return div;
}

function sendMessage() {
    const messageText = chatInput.value.trim();
    if (messageText) {
        const message = {
            text: messageText,
            sender: 'me',
            time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        };
        
        // Add message to chat
        const messageElement = createMessageElement(message);
        chatMessages.appendChild(messageElement);
        chatMessages.scrollTop = chatMessages.scrollHeight;
        
        // Clear input
        chatInput.value = '';
        
        // Update last message in chat list
        updateLastMessage(message);
    }
}

function updateLastMessage(message) {
    const activeChat = document.querySelector('.chat-item.active');
    if (activeChat) {
        const lastMessageElement = activeChat.querySelector('.last-message');
        lastMessageElement.textContent = message.text;
        
        const timeElement = activeChat.querySelector('.chat-time');
        timeElement.textContent = message.time;
    }
}

// Event Listeners
chatItems.forEach(item => {
    item.addEventListener('click', () => {
        // Remove active class from all items
        chatItems.forEach(i => i.classList.remove('active'));
        // Add active class to clicked item
        item.classList.add('active');
        
        const userId = item.dataset.userId;
        const userName = item.querySelector('h3').textContent;
        openChat(userId, userName);
    });
});

closeChatBtn.addEventListener('click', () => {
    chatPopup.classList.remove('active');
});

sendBtn.addEventListener('click', sendMessage);
chatInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        sendMessage();
    }
});

// Search functionality
const searchInput = document.querySelector('.search-box input');
searchInput.addEventListener('input', (e) => {
    const searchTerm = e.target.value.toLowerCase();
    chatItems.forEach(item => {
        const userName = item.querySelector('h3').textContent.toLowerCase();
        const lastMessage = item.querySelector('.last-message').textContent.toLowerCase();
        
        if (userName.includes(searchTerm) || lastMessage.includes(searchTerm)) {
            item.style.display = 'flex';
        } else {
            item.style.display = 'none';
        }
    });
});

// Initialize with first chat active
if (chatItems.length > 0) {
    chatItems[0].click();
} 