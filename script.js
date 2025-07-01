let currentUser = '';
let messages = [];
let onlineUsers = ['Alice', 'Bob', 'Charlie'];
let typingUsers = [];
let messageId = 1;

// Mock messages for simulation
const mockMessages = [
    { user: 'Alice', message: 'Hey everyone! How\'s your day going?' },
    { user: 'Bob', message: 'Pretty good! Just working on some code 💻' },
    { user: 'Charlie', message: 'Anyone up for a virtual coffee break?' },
    { user: 'Alice', message: 'That sounds great! I\'ll be right there ☕' },
    { user: 'Bob', message: 'This chat app looks really nice btw!' },
    { user: 'Charlie', message: 'Yeah, the design is clean and modern!' },
    { user: 'Alice', message: 'I love the real-time features 🚀' }
];

// Initialize the app
document.addEventListener('DOMContentLoaded', function() {
    // Add initial system message
    addMessage('System', 'Welcome to the chat room!', 'system');
    
    // Set initial timestamp
    updateMessageTimes();
    
    // Add event listeners
    document.getElementById('usernameInput').addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            joinChat();
        }
    });
    
    document.getElementById('messageInput').addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            sendMessage();
        }
    });
    
    document.getElementById('messageInput').addEventListener('input', function() {
        // Simulate typing indicator for current user
        handleTyping();
    });
});

// Join chat function
function joinChat() {
    const usernameInput = document.getElementById('usernameInput');
    const username = usernameInput.value.trim();
    
    if (username) {
        currentUser = username;
        
        // Hide login screen and show chat
        document.getElementById('loginScreen').classList.add('hidden');
        document.getElementById('chatScreen').classList.remove('hidden');
        
        // Update welcome text
        document.getElementById('welcomeText').textContent = `Welcome, ${username}!`;
        
        // Add user to online users list
        onlineUsers.push(username);
        updateUsersList();
        updateOnlineCount();
        
        // Add system message
        addMessage('System', `${username} joined the chat`, 'system');
        
        // Focus on message input
        document.getElementById('messageInput').focus();
        
        // Start mock message simulation
        startMockMessages();
        startTypingSimulation();
    }
}

// Send message function
function sendMessage() {
    const messageInput = document.getElementById('messageInput');
    const message = messageInput.value.trim();
    
    if (message) {
        addMessage(currentUser, message, 'sent');
        messageInput.value = '';
        updateSendButton();
        
        // Scroll to bottom
        scrollToBottom();
    }
}

// Add message to chat
function addMessage(user, text, type) {
    const messagesContainer = document.getElementById('messagesContainer');
    const messageElement = document.createElement('div');
    const timestamp = new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'});
    
    messageElement.className = `message ${type}`;
    messageElement.innerHTML = `
        <div class="message-content">
            ${type !== 'system' && type !== 'sent' ? `<div class="message-user">${user}</div>` : ''}
            <div class="message-text">${text}</div>
            <div class="message-time">${timestamp}</div>
        </div>
    `;
    
    messagesContainer.appendChild(messageElement);
    
    // Store message
    messages.push({
        id: messageId++,
        user: user,
        text: text,
        type: type,
        timestamp: timestamp
    });
    
    // Scroll to bottom
    setTimeout(() => scrollToBottom(), 100);
}

// Update users list
function updateUsersList() {
    const usersList = document.getElementById('usersList');
    usersList.innerHTML = '';
    
    onlineUsers.forEach(user => {
        const userElement = document.createElement('div');
        userElement.className = `user-item ${user === currentUser ? 'current-user' : ''}`;
        userElement.innerHTML = `
            <div class="status-dot online"></div>
            <span>${user} ${user === currentUser ? '(You)' : ''}</span>
        `;
        usersList.appendChild(userElement);
    });
}

// Update online count
function updateOnlineCount() {
    document.getElementById('onlineCount').textContent = `${onlineUsers.length} online`;
}

// Scroll to bottom of messages
function scrollToBottom() {
    const messagesContainer = document.getElementById('messagesContainer');
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
}

// Update send button state
function updateSendButton() {
    const messageInput = document.getElementById('messageInput');
    const sendBtn = document.getElementById('sendBtn');
    sendBtn.disabled = !messageInput.value.trim();
}

// Handle typing indicator
function handleTyping() {
    updateSendButton();
    // In a real app, you'd send typing status to server here
}

// Start mock messages simulation
function startMockMessages() {
    let messageIndex = 0;
    
    const sendMockMessage = () => {
        if (messageIndex < mockMessages.length) {
            const mockMsg = mockMessages[messageIndex];
            addMessage(mockMsg.user, mockMsg.message, 'received');
            messageIndex++;
            
            // Schedule next message
            setTimeout(sendMockMessage, 3000 + Math.random() * 5000);
        }
    };
    
    // Start sending mock messages after 3 seconds
    setTimeout(sendMockMessage, 3000);
}

// Start typing simulation
function startTypingSimulation() {
    const showTypingIndicator = () => {
        const users = ['Alice', 'Bob', 'Charlie'].filter(user => user !== currentUser);
        const randomUser = users[Math.floor(Math.random() * users.length)];
        
        if (Math.random() > 0.7) {
            if (!typingUsers.includes(randomUser)) {
                typingUsers.push(randomUser);
                updateTypingIndicator();
                
                // Remove typing indicator after 2-4 seconds
                setTimeout(() => {
                    typingUsers = typingUsers.filter(user => user !== randomUser);
                    updateTypingIndicator();
                }, 2000 + Math.random() * 2000);
            }
        }
        
        // Schedule next typing check
        setTimeout(showTypingIndicator, 4000 + Math.random() * 6000);
    };
    
    setTimeout(showTypingIndicator, 5000);
}

// Update typing indicator
function updateTypingIndicator() {
    const typingIndicator = document.getElementById('typingIndicator');
    const typingText = typingIndicator.querySelector('.typing-text');
    
    if (typingUsers.length > 0) {
        const text = typingUsers.length === 1 
            ? `${typingUsers[0]} is typing...`
            : `${typingUsers.join(', ')} are typing...`;
        
        typingText.textContent = text;
        typingIndicator.classList.remove('hidden');
    } else {
        typingIndicator.classList.add('hidden');
    }
}

// Update message times (called periodically)
function updateMessageTimes() {
    // In a real app, you'd update relative times here
    // For now, we'll just call this every minute
    setTimeout(updateMessageTimes, 60000);
}

// Toggle emoji (placeholder function)
function toggleEmoji() {
    // In a real app, you'd show an emoji picker here
    const messageInput = document.getElementById('messageInput');
    const emojis = ['😀', '😃', '😄', '😁', '😊', '😍', '🤔', '👍', '❤️', '🚀'];
    const randomEmoji = emojis[Math.floor(Math.random() * emojis.length)];
    messageInput.value += randomEmoji;
    messageInput.focus();
    updateSendButton();
}

// Add message input event listener for send button state
document.addEventListener('DOMContentLoaded', function() {
    const messageInput = document.getElementById('messageInput');
    if (messageInput) {
        messageInput.addEventListener('input', updateSendButton);
    }
});