let foundItems = JSON.parse(localStorage.getItem('foundItems')) || [];
let lostItems = JSON.parse(localStorage.getItem('lostItems')) || [];
let returnedItems = JSON.parse(localStorage.getItem('returnedItems')) || [];
let currentUser = JSON.parse(localStorage.getItem('currentUser')) || null;

// Student enrollment database
const studentDatabase = [
    {enrollment: '231130146001', college: 'Sal College of Engineering', branch: 'CSE', sem: '5'},
    {enrollment: '231130146002', college: 'Sal College of Engineering', branch: 'CSE', sem: '5'},
    {enrollment: '231130146003', college: 'Sal College of Engineering', branch: 'CSE', sem: '5'},
    {enrollment: '231130146004', college: 'Sal College of Engineering', branch: 'CSE', sem: '5'},
    {enrollment: '231130146005', college: 'Sal College of Engineering', branch: 'CSE', sem: '5'},
    {enrollment: '231130146006', college: 'Sal College of Engineering', branch: 'CSE', sem: '5'},
    {enrollment: '231130146007', college: 'Sal College of Engineering', branch: 'CSE', sem: '5'},
    {enrollment: '231130146008', college: 'Sal College of Engineering', branch: 'CSE', sem: '5'},
    {enrollment: '231130146009', college: 'Sal College of Engineering', branch: 'CSE', sem: '5'},
    {enrollment: '231130146010', college: 'Sal College of Engineering', branch: 'CSE', sem: '5'},
    {enrollment: '231130146011', college: 'Sal College of Engineering', branch: 'CSE', sem: '5'},
    {enrollment: '231130146012', college: 'Sal College of Engineering', branch: 'CSE', sem: '5'},
    {enrollment: '231130146013', college: 'Sal College of Engineering', branch: 'CSE', sem: '5'},
    {enrollment: '231130146014', college: 'Sal College of Engineering', branch: 'CSE', sem: '5'},
    {enrollment: '231130146015', college: 'Sal College of Engineering', branch: 'CSE', sem: '5'},
    {enrollment: '231130146016', college: 'Sal College of Engineering', branch: 'CSE', sem: '5'},
    {enrollment: '231130146017', college: 'Sal College of Engineering', branch: 'CSE', sem: '5'},
    {enrollment: '231130146018', college: 'Sal College of Engineering', branch: 'CSE', sem: '5'},
    {enrollment: '231130146019', college: 'Sal College of Engineering', branch: 'CSE', sem: '5'},
    {enrollment: '231130146020', college: 'Sal College of Engineering', branch: 'CSE', sem: '5'},
    {enrollment: '231130146021', college: 'Sal College of Engineering', branch: 'CSE', sem: '5'},
    {enrollment: '231130146022', college: 'Sal College of Engineering', branch: 'CSE', sem: '5'},
    {enrollment: '231130146023', college: 'Sal College of Engineering', branch: 'CSE', sem: '5'},
    {enrollment: '231130146024', college: 'Sal College of Engineering', branch: 'CSE', sem: '5'},
    {enrollment: '231130146025', college: 'Sal College of Engineering', branch: 'CSE', sem: '5'},
    {enrollment: '231130146026', college: 'Sal College of Engineering', branch: 'CSE', sem: '5'},
    {enrollment: '231130146027', college: 'Sal College of Engineering', branch: 'CSE', sem: '5'},
    {enrollment: '231130146028', college: 'Sal College of Engineering', branch: 'CSE', sem: '5'},
    {enrollment: '241133146001', college: 'Sal College of Engineering', branch: 'CSE', sem: '5'},
    {enrollment: '241133146002', college: 'Sal College of Engineering', branch: 'CSE', sem: '5'},
    {enrollment: '241133146003', college: 'Sal College of Engineering', branch: 'CSE', sem: '5'},
    {enrollment: '241133146004', college: 'Sal College of Engineering', branch: 'CSE', sem: '5'},
    {enrollment: '241133146005', college: 'Sal College of Engineering', branch: 'CSE', sem: '5'},
    {enrollment: '241133146006', college: 'Sal College of Engineering', branch: 'CSE', sem: '5'},
    {enrollment: '241133146007', college: 'Sal College of Engineering', branch: 'CSE', sem: '5'},
    {enrollment: '241133146008', college: 'Sal College of Engineering', branch: 'CSE', sem: '5'},
    {enrollment: '241133146009', college: 'Sal College of Engineering', branch: 'CSE', sem: '5'},
    {enrollment: '241133146010', college: 'Sal College of Engineering', branch: 'CSE', sem: '5'},
    {enrollment: '241133146011', college: 'Sal College of Engineering', branch: 'CSE', sem: '5'},
    {enrollment: '241133146012', college: 'Sal College of Engineering', branch: 'CSE', sem: '5'},
    {enrollment: '241133146013', college: 'Sal College of Engineering', branch: 'CSE', sem: '5'},
    {enrollment: '241133146014', college: 'Sal College of Engineering', branch: 'CSE', sem: '5'},
    {enrollment: '241133146015', college: 'Sal College of Engineering', branch: 'CSE', sem: '5'},
    {enrollment: '241133146016', college: 'Sal College of Engineering', branch: 'CSE', sem: '5'},
    {enrollment: '241133146017', college: 'Sal College of Engineering', branch: 'CSE', sem: '5'},
    {enrollment: '241133146018', college: 'Sal College of Engineering', branch: 'CSE', sem: '5'},
    {enrollment: '241133146019', college: 'Sal College of Engineering', branch: 'CSE', sem: '5'},
    {enrollment: '241133146020', college: 'Sal College of Engineering', branch: 'CSE', sem: '5'},
    {enrollment: '241133146021', college: 'Sal College of Engineering', branch: 'CSE', sem: '5'},
    {enrollment: '241133146022', college: 'Sal College of Engineering', branch: 'CSE', sem: '5'},
    {enrollment: '241133146023', college: 'Sal College of Engineering', branch: 'CSE', sem: '5'},
    {enrollment: '241133146024', college: 'Sal College of Engineering', branch: 'CSE', sem: '5'},
    {enrollment: '241133146025', college: 'Sal College of Engineering', branch: 'CSE', sem: '5'},
    {enrollment: '241133146026', college: 'Sal College of Engineering', branch: 'CSE', sem: '5'},
    {enrollment: '241133146027', college: 'Sal College of Engineering', branch: 'CSE', sem: '5'},
    {enrollment: '241133146028', college: 'Sal College of Engineering', branch: 'CSE', sem: '5'}
];

// Function to check if enrollment is already linked to a different email
function checkEnrollmentEmailConflict(enrollmentId, userEmail) {
    const storedEnrollments = JSON.parse(localStorage.getItem('enrollmentEmails')) || {};
    
    console.log("Checking conflict - Enrollment:", enrollmentId, "Current Email:", userEmail, "Stored:", storedEnrollments[enrollmentId]);
    
    // If enrollment exists but email is DIFFERENT, show conflict
    if (storedEnrollments[enrollmentId] && storedEnrollments[enrollmentId] !== userEmail) {
        return {
            conflict: true,
            existingEmail: storedEnrollments[enrollmentId]
        };
    }
    
    // If enrollment exists with SAME email, no conflict (allow re-verification)
    if (storedEnrollments[enrollmentId] === userEmail) {
        return { conflict: false };
    }
    
    // If enrollment doesn't exist, no conflict
    return { conflict: false };
}

// Function to save enrollment-email mapping
function saveEnrollmentEmail(enrollmentId, userEmail) {
    const storedEnrollments = JSON.parse(localStorage.getItem('enrollmentEmails')) || {};
    storedEnrollments[enrollmentId] = userEmail;
    localStorage.setItem('enrollmentEmails', JSON.stringify(storedEnrollments));
    console.log("Enrollment saved:", enrollmentId, "for email:", userEmail);
}

// Initialize the application
function init() {
    // Set today's date as default for date inputs
    const today = new Date().toISOString().split('T')[0];
    const dateInputs = document.querySelectorAll('input[type="date"]');
    dateInputs.forEach(input => input.value = today);
    
    // Check if user is already verified and redirect to home
    if (currentUser) {
        document.getElementById('enrollment-page').classList.add('hidden');
        document.getElementById('navbar').classList.remove('hidden');
        showPage('home');
        updateProfile();
        updateStatistics();
    }
}

// Enrollment verification
function verifyEnrollment(event) {
    event.preventDefault();
    
    const formData = new FormData(event.target);
    const enrollmentId = formData.get('enrollmentId');
    const studentName = formData.get('studentName');

    // Check if enrollment exists in database
    const studentRecord = studentDatabase.find(student => student.enrollment === enrollmentId);
    
    if (studentRecord) {
        // Auto-fill the details
        document.getElementById('branch').value = studentRecord.branch;
        document.getElementById('college').value = studentRecord.college;
        document.getElementById('semester').value = studentRecord.sem;
        
        // Get the current user's email from localStorage
        const userEmail = localStorage.getItem('currentUserEmail');
        console.log("User email from localStorage:", userEmail);
        
        if (!userEmail) {
            alert('Error: User email not found. Please sign in again.');
            return;
        }
        
        window.tempUserEmail = userEmail;
        
        // Hide verify button and show confirmation buttons
        document.getElementById('verifyBtn').classList.add('hidden');
        document.getElementById('verificationButtons').classList.remove('hidden');
        
        // Store temporary data
        window.tempUserData = {
            enrollmentId,
            name: studentName,
            branch: studentRecord.branch,
            college: studentRecord.college,
            semester: studentRecord.sem
        };
        
        console.log("Temp user data stored:", window.tempUserData);
    } else {
        alert('Enrollment ID not found. Please contact the administrator.');
    }
}

function confirmDetails(isCorrect) {
    console.log("confirmDetails called with:", isCorrect);
    
    if (isCorrect) {
        // Get the current user's email from localStorage 
        const userEmail = localStorage.getItem('currentUserEmail');
        const enrollmentId = window.tempUserData.enrollmentId;
        
        console.log("Confirming details - Email:", userEmail, "Enrollment:", enrollmentId);
        
        if (!userEmail) {
            alert('Error: User email not found. Please sign in again.');
            return;
        }
        
        // Check for email-enrollment conflict
        const conflictCheck = checkEnrollmentEmailConflict(enrollmentId, userEmail);
        
        if (conflictCheck.conflict) {
            showEmailConflictModal(conflictCheck.existingEmail);
            return;
        }
        
        // Set current user
        currentUser = window.tempUserData;
        localStorage.setItem('currentUser', JSON.stringify(currentUser));
        
        // Save the enrollment-email mapping
        saveEnrollmentEmail(enrollmentId, userEmail);
        
        // Show success animation
        const buttons = document.querySelectorAll('#verificationButtons button');
        buttons[0].innerHTML = '<i class="fas fa-check mr-2"></i>Verified!';
        buttons[0].classList.add('success-animation');
        buttons[0].disabled = true;
        buttons[1].disabled = true;

        setTimeout(() => {
            document.getElementById('enrollment-page').classList.add('hidden');
            document.getElementById('navbar').classList.remove('hidden');
            
            // Scroll to top first for smooth effect
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
            
            // Then show home page
            setTimeout(() => {
                showPage('home');
                updateProfile();
                updateStatistics();
                showSuccessModal('🎉 Welcome to SAL College Lost & Found System!');
            }, 300);
        }, 1000);
    } else {
        // Show contact information
        alert('Please contact:\nHOD: hod.cse@salcollege.edu\nCoordinator: coordinator.cse@salcollege.edu\nPhone: +91-XXXXXXXXXX');
    }
}

// Email conflict modal functions
function showEmailConflictModal(existingEmail) {
    document.getElementById('existingEmail').textContent = existingEmail;
    document.getElementById('conflictMessage').textContent = 
        `This enrollment ID is already associated with: ${existingEmail}`;
    document.getElementById('emailConflictModal').classList.remove('hidden');
    document.getElementById('emailConflictModal').classList.add('flex');
}

function closeEmailConflictModal() {
    document.getElementById('emailConflictModal').classList.add('hidden');
    document.getElementById('emailConflictModal').classList.remove('flex');
    // Reset the form
    document.getElementById('enrollmentForm').reset();
    document.getElementById('verifyBtn').classList.remove('hidden');
    document.getElementById('verificationButtons').classList.add('hidden');
}

function redirectToLogin() {
    closeEmailConflictModal();
    logout();
}

// Navigation functions
function showPage(pageId) {
    console.log("Showing page:", pageId);
    
    // Hide all pages
    const pages = ['home-page', 'report-found-page', 'report-lost-page', 'search-page', 'profile-page'];
    pages.forEach(page => {
        const pageElement = document.getElementById(page);
        if (pageElement) {
            pageElement.classList.add('hidden');
        }
    });

    // Show selected page
    const targetPage = document.getElementById(pageId + '-page');
    if (targetPage) {
        targetPage.classList.remove('hidden');
    }
    
    // Close profile menu if open
    const profileMenu = document.getElementById('profileMenu');
    if (profileMenu) {
        profileMenu.classList.add('hidden');
    }

    // Load page-specific content
    if (pageId === 'home') {
        updateStatistics();
    } else if (pageId === 'search') {
        searchItems();
    } else if (pageId === 'profile') {
        loadUserItems();
    }
}

// Function to save all data to localStorage
function saveAllData() {
    localStorage.setItem('foundItems', JSON.stringify(foundItems));
    localStorage.setItem('lostItems', JSON.stringify(lostItems));
    localStorage.setItem('returnedItems', JSON.stringify(returnedItems));
}

function toggleProfileMenu() {
    const menu = document.getElementById('profileMenu');
    if (menu) {
        menu.classList.toggle('hidden');
    }
}

function updateProfile() {
    if (currentUser) {
        const profileName = document.getElementById('profileName');
        const profileEnrollment = document.getElementById('profileEnrollment');
        const profileDepartment = document.getElementById('profileDepartment');
        
        if (profileName) profileName.textContent = currentUser.name;
        if (profileEnrollment) profileEnrollment.textContent = `Enrollment ID: ${currentUser.enrollmentId}`;
        if (profileDepartment) profileDepartment.textContent = `Branch: ${currentUser.branch} | Semester: ${currentUser.semester}`;
        
        loadUserItems();
    }
}

function updateStatistics() {
    const totalSubmissions = foundItems.length + lostItems.length;
    
    const totalSubmissionsEl = document.getElementById('totalSubmissions');
    const totalFoundEl = document.getElementById('totalFound');
    const totalLostEl = document.getElementById('totalLost');
    const totalReturnedEl = document.getElementById('totalReturned');
    
    if (totalSubmissionsEl) totalSubmissionsEl.textContent = totalSubmissions;
    if (totalFoundEl) totalFoundEl.textContent = foundItems.length;
    if (totalLostEl) totalLostEl.textContent = lostItems.length;
    if (totalReturnedEl) totalReturnedEl.textContent = returnedItems.length;
}

function loadUserItems() {
    if (!currentUser) return;
    
    const userFoundItems = foundItems.filter(item => item.reporterId === currentUser.enrollmentId);
    const userLostItems = lostItems.filter(item => item.reporterId === currentUser.enrollmentId);
    const allUserItems = [...userFoundItems, ...userLostItems];
    
    const container = document.getElementById('userItems');
    
    if (!container) return;
    
    if (allUserItems.length === 0) {
        container.innerHTML = `
            <div class="text-center py-8">
                <i class="fas fa-inbox text-4xl text-gray-400 mb-4"></i>
                <p class="text-gray-600">You haven't reported any items yet.</p>
            </div>
        `;
    } else {
        container.innerHTML = allUserItems.map(item => `
            <div class="bg-gray-50 rounded-lg p-4 border">
                <div class="flex items-center justify-between mb-2">
                    <span class="px-3 py-1 rounded-full text-sm font-medium ${
                        item.type === 'found' 
                            ? 'bg-green-100 text-green-800' 
                            : 'bg-red-100 text-red-800'
                    }">
                        ${item.type === 'found' ? 'Found' : 'Lost'}
                    </span>
                    <div class="flex space-x-2">
                        <button onclick="markAsReturned('${item.id}', '${item.type}')" 
                                class="text-green-600 hover:text-green-800 transition-colors" title="Mark as Returned">
                            <i class="fas fa-check-circle"></i>
                        </button>
                        <button onclick="deleteItem('${item.id}', '${item.type}')" 
                                class="text-red-600 hover:text-red-800 transition-colors" title="Delete">
                            <i class="fas fa-trash"></i>
                        </button>
                    </div>
                </div>
                
                <!-- Add Image Display -->
                <div class="mb-3">
                    ${item.imageUrl ? 
                        `<img src="${item.imageUrl}" alt="${item.name}" 
                              class="w-full h-32 object-cover rounded-lg cursor-pointer"
                              onclick="openImageModal('${item.imageUrl}')">` :
                        `<div class="w-full h-32 bg-gray-200 rounded-lg flex items-center justify-center">
                            <i class="fas fa-image text-2xl text-gray-400"></i>
                        </div>`
                    }
                </div>
                
                <h4 class="font-semibold text-gray-800">${item.name}</h4>
                <p class="text-sm text-gray-600 mb-2">${item.description}</p>
                <div class="text-xs text-gray-500">
                    <span><i class="fas fa-map-marker-alt mr-1"></i>${item.location}</span>
                    <span class="ml-4"><i class="fas fa-calendar mr-1"></i>${new Date(item.date).toLocaleDateString()}</span>
                </div>
            </div>
        `).join('');
    }
    
    // Load user's returned items history
    loadUserHistory();
}
function loadUserHistory() {
    if (!currentUser) return;
    
    const userReturnedItems = returnedItems.filter(item => 
        item.reporterId === currentUser.enrollmentId || 
        item.markedReturnedBy === currentUser.enrollmentId
    );
    
    const container = document.getElementById('userHistory');
    
    if (!container) return;

    if (userReturnedItems.length === 0) {
        container.innerHTML = `
            <div class="text-center py-8 bg-gray-50 rounded-lg">
                <i class="fas fa-history text-4xl text-gray-400 mb-4"></i>
                <p class="text-gray-600">No returned items in your history yet.</p>
            </div>
        `;
        return;
    }

    container.innerHTML = userReturnedItems.map(item => `
        <div class="bg-gray-100 rounded-lg p-4 border border-gray-300 opacity-80">
            <div class="flex items-center justify-between mb-2">
                <span class="px-3 py-1 rounded-full text-sm font-medium bg-gray-300 text-gray-700">
                    ${item.type === 'found' ? 'Found' : 'Lost'} • Returned
                </span>
                <span class="text-xs text-gray-500">
                    ${new Date(item.returnedDate).toLocaleDateString()}
                </span>
            </div>
            
            <!-- Add Image Display in History -->
            <div class="mb-3">
                ${item.imageUrl ? 
                    `<img src="${item.imageUrl}" alt="${item.name}" 
                          class="w-full h-32 object-cover rounded-lg cursor-pointer opacity-70"
                          onclick="openImageModal('${item.imageUrl}')">` :
                    `<div class="w-full h-32 bg-gray-300 rounded-lg flex items-center justify-center opacity-70">
                        <i class="fas fa-image text-2xl text-gray-500"></i>
                    </div>`
                }
            </div>
            
            <h4 class="font-semibold text-gray-700">${item.name}</h4>
            <p class="text-sm text-gray-600 mb-2">${item.description}</p>
            <div class="text-xs text-gray-500">
                <span><i class="fas fa-map-marker-alt mr-1"></i>${item.location}</span>
                <span class="ml-4"><i class="fas fa-calendar mr-1"></i>${new Date(item.date).toLocaleDateString()}</span>
                ${item.markedReturnedBy !== currentUser.enrollmentId ? 
                    `<span class="ml-4"><i class="fas fa-user-check mr-1"></i>Marked returned by you</span>` : 
                    ''}
            </div>
        </div>
    `).join('');
}

function markAsReturned(itemId, itemType) {
    if (confirm('🎉 Hurray! You helped someone find their item! Mark as returned?')) {
        let item;
        if (itemType === 'found') {
            item = foundItems.find(i => i.id == itemId);
            foundItems = foundItems.filter(i => i.id != itemId);
        } else {
            item = lostItems.find(i => i.id == itemId);
            lostItems = lostItems.filter(i => i.id != itemId);
        }
        
        if (item) {
            item.returnedDate = new Date().toISOString();
            item.markedReturnedBy = currentUser.enrollmentId;
            // Preserve the imageUrl when moving to returned items
            returnedItems.push(item);
        }
        
        saveAllData();
        loadUserItems(); // This will refresh both active items and history
        updateStatistics();
        showSuccessModal('🎉 Amazing! You made someone\'s day by helping them find their item!');
    }
}

function deleteItem(itemId, itemType) {
    if (confirm('Are you sure you want to delete this item? This action cannot be undone.')) {
        if (itemType === 'found') {
            foundItems = foundItems.filter(item => item.id != itemId);
        } else {
            lostItems = lostItems.filter(item => item.id != itemId);
        }
        saveAllData();
        loadUserItems();
        updateStatistics();
        showSuccessModal('Item deleted successfully!');
    }
}
async function submitFoundItem(event) {
    event.preventDefault();
    
    const formData = new FormData(event.target);
    const imageFile = document.getElementById('foundItemImage').files[0];
    const userId = localStorage.getItem('loggedInUserId');
    
    if (!userId) {
        showSuccessModal('Please log in again.');
        return;
    }

    const itemId = Date.now().toString();
    let imageUrl = null;

    // Upload image if provided
    if (imageFile) {
        try {
            showMessage('Uploading image...', 'signInMessage');
            imageUrl = await uploadItemImage(imageFile, userId, itemId);
        } catch (error) {
            console.error('Image upload failed:', error);
            showSuccessModal('Item reported but image upload failed.');
        }
    }

    const item = {
        id: itemId,
        type: 'found',
        category: formData.get('category'),
        name: formData.get('itemName'),
        description: formData.get('description'),
        location: formData.get('location'),
        date: formData.get('dateFound'),
        contact: formData.get('contactInfo'),
        reporter: currentUser.name,
        reporterId: currentUser.enrollmentId,
        imageUrl: imageUrl, // Add image URL to item data
        timestamp: new Date().toISOString()
    };

    foundItems.push(item);
    saveAllData();
    updateStatistics();
    
    // Reset form and image preview
    event.target.reset();
    removeImage('foundItemImage', 'foundImagePreview');
    
    showSuccessModal('Found item reported successfully!' + (imageUrl ? ' Image uploaded.' : ''));
}

async function submitLostItem(event) {
    event.preventDefault();
    
    const formData = new FormData(event.target);
    const imageFile = document.getElementById('lostItemImage').files[0];
    const userId = localStorage.getItem('loggedInUserId');
    
    if (!userId) {
        showSuccessModal('Please log in again.');
        return;
    }

    const itemId = Date.now().toString();
    let imageUrl = null;

    // Upload image if provided
    if (imageFile) {
        try {
            showMessage('Uploading image...', 'signInMessage');
            imageUrl = await uploadItemImage(imageFile, userId, itemId);
        } catch (error) {
            console.error('Image upload failed:', error);
            showSuccessModal('Item reported but image upload failed.');
        }
    }

    const item = {
        id: itemId,
        type: 'lost',
        category: formData.get('category'),
        name: formData.get('itemName'),
        description: formData.get('description'),
        location: formData.get('location'),
        date: formData.get('dateLost'),
        contact: formData.get('contactInfo'),
        reporter: currentUser.name,
        reporterId: currentUser.enrollmentId,
        imageUrl: imageUrl, // Add image URL to item data
        timestamp: new Date().toISOString()
    };

    lostItems.push(item);
    saveAllData();
    updateStatistics();
    
    // Reset form and image preview
    event.target.reset();
    removeImage('lostItemImage', 'lostImagePreview');
    
    showSuccessModal('Lost item reported successfully!' + (imageUrl ? ' Image uploaded.' : ''));
}

// Search functionality
function searchItems() {
    const query = document.getElementById('searchQuery')?.value.toLowerCase() || '';
    const category = document.getElementById('searchCategory')?.value || '';
    const type = document.getElementById('searchType')?.value || '';

    let allItems = [...foundItems, ...lostItems];

    // Filter items
    if (query) {
        allItems = allItems.filter(item => 
            item.name.toLowerCase().includes(query) || 
            item.description.toLowerCase().includes(query)
        );
    }

    if (category) {
        allItems = allItems.filter(item => item.category === category);
    }

    if (type) {
        allItems = allItems.filter(item => item.type === type);
    }

    displaySearchResults(allItems, query);
}

function highlightText(text, query) {
    if (!query) return text;
    const regex = new RegExp(`(${query})`, 'gi');
    return text.replace(regex, '<mark class="bg-yellow-200 px-1 rounded">$1</mark>');
}

function displaySearchResults(items, query = '') {
    const resultsContainer = document.getElementById('searchResults');
    
    if (!resultsContainer) return;
    
    if (items.length === 0) {
        resultsContainer.innerHTML = `
            <div class="col-span-full text-center py-12">
                <i class="fas fa-search text-4xl text-gray-400 mb-4"></i>
                <p class="text-gray-600">No items found matching your search criteria.</p>
            </div>
        `;
        return;
    }

    resultsContainer.innerHTML = items.map(item => `
        <div class="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow">
            <div class="flex items-center justify-between mb-4">
                <span class="px-3 py-1 rounded-full text-sm font-medium ${
                    item.type === 'found' 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-red-100 text-red-800'
                }">
                    ${item.type === 'found' ? 'Found' : 'Lost'}
                </span>
                <span class="text-sm text-gray-500">${item.category}</span>
            </div>
            
            <!-- Image Section -->
            <div class="mb-4">
                ${item.imageUrl ? 
                    `<img src="${item.imageUrl}" alt="${item.name}" 
                          class="w-full h-48 object-cover rounded-lg mb-2 cursor-pointer"
                          onclick="openImageModal('${item.imageUrl}')">` :
                    `<div class="w-full h-48 bg-gray-200 rounded-lg flex items-center justify-center mb-2">
                        <i class="fas fa-image text-4xl text-gray-400"></i>
                    </div>`
                }
            </div>
            
            <h3 class="text-lg font-bold text-gray-800 mb-2">${highlightText(item.name, query)}</h3>
            <p class="text-gray-600 mb-4">${highlightText(item.description, query)}</p>
            
            <div class="space-y-2 text-sm text-gray-500">
                <div><i class="fas fa-map-marker-alt mr-2"></i>${item.location}</div>
                <div><i class="fas fa-calendar mr-2"></i>${new Date(item.date).toLocaleDateString()}</div>
                <div><i class="fas fa-user mr-2"></i>Reported by ${item.reporter}</div>
            </div>
            
            <button onclick="contactReporter('${item.contact}')" 
                    class="mt-4 w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors">
                <i class="fas fa-envelope mr-2"></i>Contact Reporter
            </button>
        </div>
    `).join('');
}

// Add image modal function
function openImageModal(imageUrl) {
    const modal = document.createElement('div');
    modal.className = 'fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50';
    modal.innerHTML = `
        <div class="max-w-4xl max-h-full p-4">
            <div class="bg-white rounded-lg p-4">
                <div class="flex justify-between items-center mb-4">
                    <h3 class="text-lg font-semibold">Item Image</h3>
                    <button onclick="this.closest('.fixed').remove()" 
                            class="text-gray-500 hover:text-gray-700">
                        <i class="fas fa-times text-2xl"></i>
                    </button>
                </div>
                <img src="${imageUrl}" alt="Item Image" class="max-w-full max-h-96 object-contain rounded">
            </div>
        </div>
    `;
    document.body.appendChild(modal);
    
    // Close modal on background click
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.remove();
        }
    });
}

function contactReporter(contact) {
    alert(`Contact the reporter at: ${contact}`);
}

// Modal functions
function showSuccessModal(message) {
    const successMessage = document.getElementById('successMessage');
    const successModal = document.getElementById('successModal');
    
    if (successMessage) successMessage.textContent = message;
    if (successModal) {
        successModal.classList.remove('hidden');
        successModal.classList.add('flex');
    }
}

function closeSuccessModal() {
    const successModal = document.getElementById('successModal');
    if (successModal) {
        successModal.classList.add('hidden');
        successModal.classList.remove('flex');
    }
}

function logout() {
    currentUser = null;
    localStorage.removeItem('currentUser');
    localStorage.removeItem('loggedInUserId');
    localStorage.removeItem('currentUserEmail');
    
    // Redirect to authentication page
    window.location.href = 'index.html';
}

// Close profile menu when clicking outside
document.addEventListener('click', function(event) {
    const profileMenu = document.getElementById('profileMenu');
    const profileButton = event.target.closest('button[onclick="toggleProfileMenu()"]');
    
    if (profileMenu && !profileButton && !profileMenu.contains(event.target)) {
        profileMenu.classList.add('hidden');
    }
});

// Initialize the application when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM loaded, initializing app...');
    init();
});

// Debug function
function debugEnrollmentData() {
    console.log('=== DEBUG ENROLLMENT DATA ===');
    console.log('currentUser:', currentUser);
    console.log('currentUserEmail:', localStorage.getItem('currentUserEmail'));
    console.log('enrollmentEmails:', JSON.parse(localStorage.getItem('enrollmentEmails') || '{}'));
    console.log('loggedInUserId:', localStorage.getItem('loggedInUserId'));
    console.log('=============================');
}
// Add this function to app.js for debugging and management
function manageEnrollmentMappings() {
    console.log('=== Enrollment Email Mappings ===');
    const storedEnrollments = JSON.parse(localStorage.getItem('enrollmentEmails')) || {};
    
    if (Object.keys(storedEnrollments).length === 0) {
        console.log('No enrollment mappings found.');
        return;
    }
    
    console.table(storedEnrollments);
    
    // Create a simple UI to manage mappings (optional)
    const enrollmentToRemove = prompt('Enter the Enrollment ID you want to remove:');
    if (enrollmentToRemove) {
        if (storedEnrollments[enrollmentToRemove]) {
            delete storedEnrollments[enrollmentToRemove];
            localStorage.setItem('enrollmentEmails', JSON.stringify(storedEnrollments));
            console.log(`✅ Removed enrollment mapping for: ${enrollmentToRemove}`);
            alert(`Enrollment ${enrollmentToRemove} has been removed from mappings.`);
        } else {
            console.log(`Enrollment ${enrollmentToRemove} not found in mappings.`);
            alert(`Enrollment ${enrollmentToRemove} not found in mappings.`);
        }
    }
}

// Add this function to clear ALL enrollment mappings
function clearAllEnrollmentMappings() {
    if (confirm('Are you sure you want to clear ALL enrollment mappings? This cannot be undone.')) {
        localStorage.removeItem('enrollmentEmails');
        console.log('✅ All enrollment mappings cleared.');
        alert('All enrollment mappings have been cleared.');
    }
}
// Add this function to remove enrollment mapping
function removeEnrollmentMapping(enrollmentId) {
    const storedEnrollments = JSON.parse(localStorage.getItem('enrollmentEmails')) || {};
    if (storedEnrollments[enrollmentId]) {
        delete storedEnrollments[enrollmentId];
        localStorage.setItem('enrollmentEmails', JSON.stringify(storedEnrollments));
        console.log(`✅ Removed enrollment mapping for: ${enrollmentId}`);
        alert(`Enrollment ${enrollmentId} has been removed from mappings.`);
        return true;
    } else {
        console.log(`Enrollment ${enrollmentId} not found in mappings.`);
        alert(`Enrollment ${enrollmentId} not found in mappings.`);
        return false;
    }
}
// Image upload and preview functions
function previewImage(input, previewId) {
    const file = input.files[0];
    const preview = document.getElementById(previewId);
    const placeholder = document.getElementById(input.id.replace('Image', 'ImagePlaceholder'));
    
    if (file) {
        // Validate file size (5MB max)
        if (file.size > 5 * 1024 * 1024) {
            alert('Image size must be less than 5MB');
            input.value = '';
            return;
        }
        
        const reader = new FileReader();
        reader.onload = function(e) {
            const img = preview.querySelector('img');
            img.src = e.target.result;
            preview.classList.remove('hidden');
            placeholder.classList.add('hidden');
        }
        reader.readAsDataURL(file);
    }
}

function removeImage(inputId, previewId) {
    const input = document.getElementById(inputId);
    const preview = document.getElementById(previewId);
    const placeholder = document.getElementById(inputId.replace('Image', 'ImagePlaceholder'));
    
    input.value = '';
    preview.classList.add('hidden');
    placeholder.classList.remove('hidden');
}

// Upload image to Firebase Storage
async function uploadItemImage(file, userId, itemId) {
    try {
        // Import storage functions
        const { getStorage, ref, uploadBytes, getDownloadURL } = await import("https://www.gstatic.com/firebasejs/10.11.1/firebase-storage.js");
        
        const storage = getStorage();
        const storageRef = ref(storage, `item-images/${userId}/${itemId}/${file.name}`);
        
        // Upload file
        const snapshot = await uploadBytes(storageRef, file);
        // Get download URL
        const downloadURL = await getDownloadURL(snapshot.ref);
        
        return downloadURL;
    } catch (error) {
        console.error('Error uploading image:', error);
        throw error;
    }
}