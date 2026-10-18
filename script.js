(function () {
    'use strict';

    /* ============================================================
       FIREBASE STATE (populated once the module script fires)
       ============================================================ */
    let FIREBASE = null;      // window.Firebase
    let firebaseReady = false;

    /* ============================================================
       DATA (kept in memory – synced from Firestore on load)
       ============================================================ */
    let allStudents = [
        { name: 'Abebech Abera', id: 'ECE/1001/19', stream: 'Computer' },
        { name: 'Abel Admassu', id: 'ECE/1002/19', stream: 'Computer' },
        { name: 'Abenezer Alemu', id: 'ECE/1003/19', stream: 'Computer' },
        { name: 'Amanuel Assefa', id: 'ECE/1004/19', stream: 'Computer' },
        { name: 'Bethelhem Bekele', id: 'ECE/1005/19', stream: 'Computer' },
        { name: 'Bereket Belay', id: 'ECE/1006/19', stream: 'Computer' },
        { name: 'Biruk Desta', id: 'ECE/1007/19', stream: 'Computer' },
        { name: 'Dagim Gebremariam', id: 'ECE/1008/19', stream: 'Computer' },
        { name: 'Eden Girmay', id: 'ECE/1009/19', stream: 'Computer' },
        { name: 'Elias Haile', id: 'ECE/1010/19', stream: 'Computer' },
        { name: 'Eyerusalem Hailu', id: 'ECE/1011/19', stream: 'Computer' },
        { name: 'Fikremariam Kassahun', id: 'ECE/1012/19', stream: 'Computer' },
        { name: 'Gebre Kebede', id: 'ECE/1013/19', stream: 'Computer' },
        { name: 'Girma Legesse', id: 'ECE/1014/19', stream: 'Computer' },
        { name: 'Hanna Melaku', id: 'ECE/1015/19', stream: 'Computer' },
        { name: 'Henok Mengistu', id: 'ECE/1016/19', stream: 'Communication' },
        { name: 'Kidist Moges', id: 'ECE/1017/19', stream: 'Communication' },
        { name: 'Mahlet Mulugeta', id: 'ECE/1018/19', stream: 'Communication' },
        { name: 'Mekdes Negash', id: 'ECE/1019/19', stream: 'Communication' },
        { name: 'Meron Nega', id: 'ECE/1020/19', stream: 'Communication' },
        { name: 'Mikiyas Seyoum', id: 'ECE/1021/19', stream: 'Communication' },
        { name: 'Mulugeta Shiferaw', id: 'ECE/1022/19', stream: 'Communication' },
        { name: 'Natnael Solomon', id: 'ECE/1023/19', stream: 'Communication' },
        { name: 'Negash Tefera', id: 'ECE/1024/19', stream: 'Communication' },
        { name: 'Samuel Tesfaye', id: 'ECE/1025/19', stream: 'Communication' },
        { name: 'Selam Woldemariam', id: 'ECE/1026/19', stream: 'Communication' },
        { name: 'Sisay Worku', id: 'ECE/1027/19', stream: 'Communication' },
        { name: 'Tigist Yohannes', id: 'ECE/1028/19', stream: 'Communication' },
        { name: 'Yared Zenebe', id: 'ECE/1029/19', stream: 'Communication' },
        { name: 'Zerihun Zewdu', id: 'ECE/1030/19', stream: 'Communication' }
    ];

    let lecturers = [
        { name: 'Dr. Tekle Amanuel', role: 'Head, Electrical Engineering' },
        { name: 'Dr. Meseret Tsehay', role: 'Head, Communication Engineering' },
        { name: 'Prof. Worku Gizaw', role: 'Lecturer (Power Systems)' },
        { name: 'Dr. Selam Tesfaye', role: 'Lecturer (Electronics)' },
        { name: 'Dr. Biruk Hailu', role: 'Lecturer (Control)' },
        { name: 'Mr. Dawit Mulu', role: 'Lecturer (Communication)' },
        { name: 'Ms. Genet Assefa', role: 'Lecturer (Computer Eng.)' },
        { name: 'Dr. Abiy Tekle', role: 'Lecturer (Signals)' }
    ];

    let gratitudeItems = [
        { icon: 'fa-university', label: 'University Administration' },
        { icon: 'fa-chalkboard-teacher', label: 'Lecturers & Professors' },
        { icon: 'fa-users', label: 'Non-Teaching Staff' },
        { icon: 'fa-microscope', label: 'Lab Technicians' },
        { icon: 'fa-user-tie', label: 'Head of Departments' },
        { icon: 'fa-hand-holding-heart', label: 'Our Families & Friends' }
    ];

    let memoryData = {
        'Trip': [],
        'Graduation': [],
        'Lab Sessions': [],
        'Events': [],
        'Other': []
    };

    let coursesData = [
        // Freshman
        { code: 'ECEG 1011', name: 'Engineering Drawing', year: 'Freshman' },
        { code: 'ECEG 1012', name: 'Introduction to Engineering', year: 'Freshman' },
        { code: 'MATH 1011', name: 'Applied Mathematics I', year: 'Freshman' },
        { code: 'MATH 1012', name: 'Applied Mathematics II', year: 'Freshman' },
        { code: 'PHYS 1011', name: 'Physics I', year: 'Freshman' },
        { code: 'PHYS 1012', name: 'Physics II', year: 'Freshman' },
        { code: 'CHEM 1011', name: 'General Chemistry', year: 'Freshman' },
        { code: 'COMM 1011', name: 'Communication Skills', year: 'Freshman' },
        { code: 'PSYC 1011', name: 'General Psychology', year: 'Freshman' },
        { code: 'ECEG 1013', name: 'Computer Programming I', year: 'Freshman' },
        { code: 'ECEG 1014', name: 'Computer Programming II', year: 'Freshman' },
        { code: 'ENGL 1011', name: 'English for Engineers', year: 'Freshman' },
        // Sophomore
        { code: 'ECEG 2011', name: 'Circuit Theory I', year: 'Sophomore' },
        { code: 'ECEG 2012', name: 'Circuit Theory II', year: 'Sophomore' },
        { code: 'ECEG 2013', name: 'Electronics I', year: 'Sophomore' },
        { code: 'ECEG 2014', name: 'Electronics II', year: 'Sophomore' },
        { code: 'ECEG 2015', name: 'Digital Logic Design', year: 'Sophomore' },
        { code: 'ECEG 2016', name: 'Signals and Systems', year: 'Sophomore' },
        { code: 'MATH 2011', name: 'Applied Mathematics III', year: 'Sophomore' },
        { code: 'MATH 2012', name: 'Applied Mathematics IV', year: 'Sophomore' },
        { code: 'ECEG 2019', name: 'Fundamentals of Electrical Engineering', year: 'Sophomore' },
        { code: 'STAT 2011', name: 'Probability and Statistics', year: 'Sophomore' },
        // Junior
        { code: 'ECEG 3011', name: 'Communication Systems I', year: 'Junior' },
        { code: 'ECEG 3012', name: 'Communication Systems II', year: 'Junior' },
        { code: 'ECEG 3013', name: 'Control Systems I', year: 'Junior' },
        { code: 'ECEG 3017', name: 'Microprocessors and Interfacing', year: 'Junior' },
        { code: 'ECEG 3018', name: 'Electromagnetic Fields', year: 'Junior' },
        { code: 'ECEG 3019', name: 'Digital Signal Processing', year: 'Junior' },
        { code: 'ECEG 3020', name: 'Embedded Systems', year: 'Junior' },
        { code: 'ECEG 3022', name: 'Network Analysis', year: 'Junior' }
    ];

    const ADMIN_PASSWORD = 'admin123';
    let isAdmin = false;

    /* ============================================================
       HELPERS
       ============================================================ */
    const $ = (sel, root = document) => root.querySelector(sel);
    const $$ = (sel, root = document) => Array.from(root.querySelectorAll(sel));

    const YEAR_ORDER = ['Freshman', 'Sophomore', 'Junior', 'Senior', 'Fifth Year'];
    const YEAR_EMOJI = {
        'Freshman': '',
        'Sophomore': '',
        'Junior': '',
        'Senior': '',
        'Fifth Year': ''
    };

    /* ============================================================
       CLOUD STATUS
       ============================================================ */
    function setCloudStatus(state, message) {
        const el = $('#cloudStatus');
        if (!el) return;
        el.className = 'cloud-status ' + state;
        el.innerHTML = `<i class="fas ${state === 'connected' ? 'fa-cloud' : state === 'error' ? 'fa-exclamation-triangle' : 'fa-spinner fa-spin'}"></i> ${message}`;
    }

    /* ============================================================
       FIREBASE HELPERS
       ============================================================ */
    // Upload a File/Blob to Firebase Storage and return the public URL.
    async function uploadToCloud(path, file) {
        if (!FIREBASE) throw new Error('Firebase not ready');
        const storageRef = FIREBASE.ref(FIREBASE.storage, path);
        await FIREBASE.uploadBytes(storageRef, file, { contentType: file.type });
        return await FIREBASE.getDownloadURL(storageRef);
    }

    // Delete a file from Firebase Storage by its path.
    async function deleteFromCloud(path) {
        if (!FIREBASE) return;
        try {
            const storageRef = FIREBASE.ref(FIREBASE.storage, path);
            await FIREBASE.deleteObject(storageRef);
        } catch (e) {
            // Ignore if file is missing
        }
    }

    // Save a URL (or any data) into Firestore under a specific collection/doc.
    async function saveToFirestore(collection, docId, data) {
        if (!FIREBASE) return;
        const ref = FIREBASE.doc(FIREBASE.db, collection, docId);
        await FIREBASE.setDoc(ref, data, { merge: true });
    }

    // Read a single document from Firestore.
    async function readFromFirestore(collection, docId) {
        if (!FIREBASE) return null;
        const ref = FIREBASE.doc(FIREBASE.db, collection, docId);
        const snap = await FIREBASE.getDoc(ref);
        return snap.exists() ? snap.data() : null;
    }

    /* ============================================================
       SAVE / LOAD WHOLE YEARBOOK
       ============================================================ */
    async function saveAllData() {
        if (!FIREBASE) return;   // Silently skip if offline
        try {
            await saveToFirestore('yearbook', 'main', {
                students: allStudents,
                lecturers,
                gratitude: gratitudeItems,
                memories: memoryData,
                courses: coursesData
            });
        } catch (e) {
            console.error('Save to Firestore failed:', e);
        }
    }

    async function loadAllData() {
        if (!FIREBASE) return;
        try {
            const data = await readFromFirestore('yearbook', 'main');
            if (data) {
                if (data.students) allStudents = data.students;
                if (data.lecturers) lecturers = data.lecturers;
                if (data.gratitude) gratitudeItems = data.gratitude;
                if (data.memories) {
                    Object.keys(memoryData).forEach((cat) => {
                        if (!data.memories[cat]) data.memories[cat] = [];
                    });
                    memoryData = data.memories;
                }
                if (data.courses) coursesData = data.courses;
            }
        } catch (e) {
            console.error('Load from Firestore failed:', e);
        }
    }

    /* ============================================================
       MODALS
       ============================================================ */
    function showModal(title, message, type, callback) {
        const modal = $('#customModal');
        const icon = $('#modalIcon');
        const titleEl = $('#modalTitle');
        const messageEl = $('#modalMessage');
        const btn = $('#modalBtn');

        icon.innerHTML = '';
        const i = document.createElement('i');
        if (type === 'success') {
            i.className = 'fas fa-check-circle';
            i.style.color = '#007ACC';
            btn.style.background = '#007ACC';
        } else if (type === 'error') {
            i.className = 'fas fa-times-circle';
            i.style.color = '#D32F2F';
            btn.style.background = '#D32F2F';
        } else if (type === 'warning') {
            i.className = 'fas fa-info-circle';
            i.style.color = '#FFA000';
            btn.style.background = '#FFA000';
        } else {
            i.className = 'fas fa-info-circle';
            i.style.color = '#007ACC';
            btn.style.background = '#007ACC';
        }
        icon.appendChild(i);

        titleEl.textContent = title;
        messageEl.textContent = message;

        modal.classList.add('active');
        document.body.style.overflow = 'hidden';

        const close = () => {
            modal.classList.remove('active');
            document.body.style.overflow = '';
            btn.removeEventListener('click', close);
            document.removeEventListener('keydown', onKey);
            modal.removeEventListener('click', onBackdrop);
            if (callback) callback();
        };
        const onKey = (e) => { if (e.key === 'Escape') close(); };
        const onBackdrop = (e) => { if (e.target === modal) close(); };

        btn.addEventListener('click', close);
        document.addEventListener('keydown', onKey);
        modal.addEventListener('click', onBackdrop);
    }

    function showConfirmModal(message, onConfirm) {
        const modal = $('#confirmModal');
        const messageEl = $('#confirmMessage');
        const okBtn = $('#confirmOk');
        const cancelBtn = $('#confirmCancel');

        messageEl.textContent = message;
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';

        const cleanup = () => {
            modal.classList.remove('active');
            document.body.style.overflow = '';
            okBtn.removeEventListener('click', onOk);
            cancelBtn.removeEventListener('click', onCancel);
            document.removeEventListener('keydown', onKey);
            modal.removeEventListener('click', onBackdrop);
        };
        const onOk = () => { cleanup(); onConfirm && onConfirm(true); };
        const onCancel = () => { cleanup(); onConfirm && onConfirm(false); };
        const onKey = (e) => { if (e.key === 'Escape') onCancel(); };
        const onBackdrop = (e) => { if (e.target === modal) onCancel(); };

        okBtn.addEventListener('click', onOk);
        cancelBtn.addEventListener('click', onCancel);
        document.addEventListener('keydown', onKey);
        modal.addEventListener('click', onBackdrop);
    }

    /* ============================================================
       ZOOM
       ============================================================ */
    function setupZoom() {
        const modal = $('#zoomModal');
        const closeBtn = $('#zoomClose');
        const content = $('#zoomContent');

        function openZoom(src, type) {
            content.innerHTML = '';
            if (type === 'video') {
                const v = document.createElement('video');
                v.src = src;
                v.controls = true;
                v.className = 'zoom-video';
                v.autoplay = true;
                content.appendChild(v);
            } else {
                const img = document.createElement('img');
                img.src = src;
                img.className = 'zoom-content';
                content.appendChild(img);
            }
            modal.classList.add('active');
            document.body.style.overflow = 'hidden';
        }

        function closeZoom() {
            modal.classList.remove('active');
            document.body.style.overflow = '';
            const v = content.querySelector('video');
            if (v) v.pause();
            content.innerHTML = '';
        }

        closeBtn.addEventListener('click', closeZoom);
        modal.addEventListener('click', (e) => { if (e.target === modal) closeZoom(); });
        document.addEventListener('keydown', (e) => { if (e.key === 'Escape') closeZoom(); });

        window.openZoom = openZoom;
    }

    /* ============================================================
       SCROLL ANIMATIONS + PROGRESS
       ============================================================ */
    function setupScrollAnimations() {
        const els = $$('.scroll-animate');
        const obs = new IntersectionObserver((entries) => {
            entries.forEach((en) => {
                if (en.isIntersecting) en.target.classList.add('visible');
            });
        }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });
        els.forEach((el) => obs.observe(el));
    }

    function setupScrollProgress() {
        const bar = document.createElement('div');
        bar.className = 'scroll-progress';
        document.body.prepend(bar);
        window.addEventListener('scroll', () => {
            const top = window.pageYOffset || document.documentElement.scrollTop;
            const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
            bar.style.width = (top / height) * 100 + '%';
        });
    }

    /* ============================================================
       LOGO (Firebase Storage)
       ============================================================ */
    function setupLogoUpload() {
        const holder = $('#logoPlaceholder');

        // Try to load from cloud first
        (async () => {
            if (!FIREBASE) return;
            const data = await readFromFirestore('settings', 'logo');
            if (data && data.url) {
                holder.innerHTML = '';
                const img = document.createElement('img');
                img.src = data.url;
                img.alt = 'University Logo';
                holder.appendChild(img);
                const input = document.createElement('input');
                input.type = 'file';
                input.id = 'logoUpload';
                input.accept = 'image/*';
                holder.appendChild(input);
                input.addEventListener('change', handleLogoUpload);
            } else {
                const input = $('#logoUpload');
                if (input) input.addEventListener('change', handleLogoUpload);
            }
        })();
    }

    async function handleLogoUpload(e) {
        const input = e.target;
        if (!isAdmin) {
            showModal('Access Denied', '🔒 Admin login required to upload logo.', 'error');
            input.value = '';
            return;
        }
        const file = input.files[0];
        if (!file) return;
        if (file.size > 2 * 1024 * 1024) {
            showModal('File Too Large', '⚠️ Logo file must be under 2MB.', 'warning');
            input.value = '';
            return;
        }
        try {
            setCloudStatus('', 'Uploading logo...');
            const url = await uploadToCloud('logo/university-logo', file);
            await saveToFirestore('settings', 'logo', { url });
            setCloudStatus('connected', 'Synced');

            const holder = $('#logoPlaceholder');
            holder.innerHTML = '';
            const img = document.createElement('img');
            img.src = url;
            img.alt = 'University Logo';
            holder.appendChild(img);
            const newInput = document.createElement('input');
            newInput.type = 'file';
            newInput.id = 'logoUpload';
            newInput.accept = 'image/*';
            holder.appendChild(newInput);
            newInput.addEventListener('change', handleLogoUpload);

            showModal('Success!', '✅ School logo synced to the cloud!', 'success');
        } catch (err) {
            console.error(err);
            setCloudStatus('error', 'Upload failed');
            showModal('Upload Failed', '❌ Could not upload logo. Check your Firebase config.', 'error');
        }
    }

    /* ============================================================
       HOME PREVIEWS
       ============================================================ */
    async function renderHomePreviews() {
        /* Students preview */
        const studentPreview = $('#homeStudentPreview');
        studentPreview.innerHTML = '';
        const previewStudents = allStudents.slice(0, 6);
        previewStudents.forEach((s) => {
            const div = document.createElement('div');
            div.className = 'home-preview-item';
            (async () => {
                const data = await readFromFirestore('studentPhotos', s.id);
                const url = data && data.url;
                div.innerHTML = `
                    ${url ? `<img src="${url}" class="preview-photo" alt="${s.name}">`
                          : '<i class="fas fa-user-circle" style="font-size:2rem; color:#B0B0B0;"></i>'}
                    <div class="label">${s.name}</div>
                    <div class="count">${s.id}</div>`;
            })();
            studentPreview.appendChild(div);
        });
        if (allStudents.length > 6) {
            const more = document.createElement('div');
            more.className = 'home-preview-item';
            more.innerHTML = `<i class="fas fa-ellipsis-h" style="font-size:1.5rem; color:#007ACC;"></i>
                              <div class="label">+${allStudents.length - 6} more</div>`;
            studentPreview.appendChild(more);
        }

        /* Courses preview */
        const coursesPreview = $('#homeCoursesPreview');
        coursesPreview.innerHTML = '';
        coursesData.slice(0, 6).forEach((c) => {
            const div = document.createElement('div');
            div.className = 'home-preview-item';
            div.innerHTML = `<i class="fas fa-book" style="font-size:1.5rem; color:#007ACC;"></i>
                             <div class="label">${c.code}</div>
                             <div class="count">${c.name}</div>`;
            coursesPreview.appendChild(div);
        });
        if (coursesData.length > 6) {
            const more = document.createElement('div');
            more.className = 'home-preview-item';
            more.innerHTML = `<i class="fas fa-ellipsis-h" style="font-size:1.5rem; color:#007ACC;"></i>
                              <div class="label">+${coursesData.length - 6} more</div>`;
            coursesPreview.appendChild(more);
        }

        /* Memories preview */
        const memoryPreview = $('#homeMemoryPreview');
        memoryPreview.innerHTML = '';
        const allMemories = [];
        Object.keys(memoryData).forEach((cat) => {
            memoryData[cat].forEach((item) => allMemories.push({ ...item, category: cat }));
        });
        const previewMem = allMemories.slice(0, 4);
        if (previewMem.length === 0) {
            memoryPreview.innerHTML =
                `<div class="home-preview-item"><i class="fas fa-images" style="font-size:2rem; color:#B0B0B0;"></i><div class="label">No memories yet</div></div>`;
        } else {
            previewMem.forEach((item) => {
                const div = document.createElement('div');
                div.className = 'home-preview-item';
                const isVid = item.type && item.type.startsWith('video/');
                const isImg = item.type && item.type.startsWith('image/');
                let html = '';
                if (isImg && item.url) html = `<img src="${item.url}" class="preview-img-sm" alt="memory">`;
                else if (isVid) html = `<i class="fas fa-video" style="font-size:2rem; color:#007ACC;"></i>`;
                else html = `<i class="fas fa-file" style="font-size:2rem; color:#007ACC;"></i>`;
                div.innerHTML = `${html}<div class="count">${item.category}</div>`;
                memoryPreview.appendChild(div);
            });
            if (allMemories.length > 4) {
                const more = document.createElement('div');
                more.className = 'home-preview-item';
                more.innerHTML = `<i class="fas fa-ellipsis-h" style="font-size:1.5rem; color:#007ACC;"></i>
                                  <div class="label">+${allMemories.length - 4} more</div>`;
                memoryPreview.appendChild(more);
            }
        }

        /* Lecturers preview */
        const lecturerPreview = $('#homeLecturerPreview');
        lecturerPreview.innerHTML = '';
        lecturers.slice(0, 6).forEach((l, idx) => {
            const div = document.createElement('div');
            div.className = 'home-preview-item';
            (async () => {
                const data = await readFromFirestore('lecturerPhotos', String(idx));
                const url = data && data.url;
                div.innerHTML = `
                    ${url ? `<img src="${url}" class="preview-photo" alt="${l.name}">`
                          : '<i class="fas fa-user-tie" style="font-size:2rem; color:#B0B0B0;"></i>'}
                    <div class="label">${l.name}</div>
                    <div class="count">${l.role}</div>`;
            })();
            lecturerPreview.appendChild(div);
        });
        if (lecturers.length > 6) {
            const more = document.createElement('div');
            more.className = 'home-preview-item';
            more.innerHTML = `<i class="fas fa-ellipsis-h" style="font-size:1.5rem; color:#007ACC;"></i>
                              <div class="label">+${lecturers.length - 6} more</div>`;
            lecturerPreview.appendChild(more);
        }

        /* Gratitude preview */
        const gratitudePreview = $('#homeGratitudePreview');
        gratitudePreview.innerHTML = '';
        gratitudeItems.slice(0, 6).forEach((g) => {
            const div = document.createElement('div');
            div.className = 'home-preview-item';
            div.innerHTML = `<i class="fas ${g.icon}" style="font-size:1.5rem; color:#007ACC;"></i>
                             <div class="label">${g.label}</div>`;
            gratitudePreview.appendChild(div);
        });
        if (gratitudeItems.length > 6) {
            const more = document.createElement('div');
            more.className = 'home-preview-item';
            more.innerHTML = `<i class="fas fa-ellipsis-h" style="font-size:1.5rem; color:#007ACC;"></i>
                              <div class="label">+${gratitudeItems.length - 6} more</div>`;
            gratitudePreview.appendChild(more);
        }
    }

    /* ============================================================
       STUDENTS
       ============================================================ */
    async function renderStudents() {
        const container = $('#studentStreams');
        const computer = allStudents.filter((s) => s.stream === 'Computer');
        const comm = allStudents.filter((s) => s.stream === 'Communication');

        const buildStream = (title, students) => {
            const col = document.createElement('div');
            col.className = 'stream-col';
            col.innerHTML = `<h3><i class="fas fa-microchip" style="color:#007ACC;"></i> ${title}</h3>`;

            students.forEach((s) => {
                const div = document.createElement('div');
                div.className = 'student-mini' + (isAdmin ? ' admin-mode' : '');

                /* Photo */
                const photoDiv = document.createElement('div');
                photoDiv.className = 'photo-upload';
                const input = document.createElement('input');
                input.type = 'file';
                input.accept = 'image/*';

                const icon = document.createElement('i');
                icon.className = 'fas fa-camera';
                photoDiv.appendChild(icon);
                photoDiv.appendChild(input);

                // Load existing cloud photo
                (async () => {
                    const data = await readFromFirestore('studentPhotos', s.id);
                    if (data && data.url) {
                        const img = document.createElement('img');
                        img.src = data.url;
                        img.alt = s.name;
                        photoDiv.appendChild(img);
                        icon.style.display = 'none';
                        photoDiv.classList.add('uploaded');
                    }
                    if (!isAdmin) {
                        input.disabled = true;
                        input.style.opacity = '0.3';
                    }
                })();

                if (isAdmin) {
                    input.addEventListener('change', async (e) => {
                        const file = e.target.files[0];
                        if (!file) return;
                        try {
                            setCloudStatus('', 'Uploading photo...');
                            const url = await uploadToCloud(`students/${s.id}`, file);
                            await saveToFirestore('studentPhotos', s.id, { url });
                            setCloudStatus('connected', 'Synced');

                            const existing = photoDiv.querySelector('img');
                            if (existing) existing.remove();
                            const ic = photoDiv.querySelector('i');
                            if (ic) ic.style.display = 'none';
                            const img = document.createElement('img');
                            img.src = url;
                            img.alt = s.name;
                            photoDiv.appendChild(img);
                            photoDiv.classList.add('uploaded');
                            showModal('Success!', '✅ Photo synced to the cloud!', 'success');
                            renderHomePreviews();
                        } catch (err) {
                            console.error(err);
                            setCloudStatus('error', 'Upload failed');
                            showModal('Upload Failed', '❌ Could not upload photo.', 'error');
                        }
                    });
                }

                /* Info */
                const info = document.createElement('div');
                info.className = 'info';
                const nameSpan = document.createElement('div');
                nameSpan.className = 'name';
                nameSpan.textContent = s.name;
                const idSpan = document.createElement('div');
                idSpan.className = 'id';
                idSpan.textContent = s.id;
                info.appendChild(nameSpan);
                info.appendChild(idSpan);

                /* Controls */
                const controls = document.createElement('div');
                controls.className = 'edit-controls';

                if (isAdmin) {
                    const editBtn = document.createElement('button');
                    editBtn.innerHTML = '<i class="fas fa-pen"></i>';
                    editBtn.title = 'Edit student';
                    editBtn.addEventListener('click', (e) => {
                        e.stopPropagation();
                        const newName = prompt('Enter new name:', s.name);
                        if (!newName || !newName.trim()) return;
                        const newId = prompt('Enter new ID:', s.id);
                        if (!newId || !newId.trim()) return;
                        const oldId = s.id;
                        s.name = newName.trim();
                        s.id = newId.trim();
                        if (oldId !== newId) {
                            // Move photo record to new ID
                            (async () => {
                                const old = await readFromFirestore('studentPhotos', oldId);
                                if (old && old.url) {
                                    await saveToFirestore('studentPhotos', newId, { url: old.url });
                                    await deleteFromCloud(`students/${oldId}`);
                                    // Delete old doc (best effort)
                                }
                                await saveAllData();
                                renderStudents();
                                renderHomePreviews();
                                showModal('Success!', `✅ Student updated to "${s.name}" (${s.id}).`, 'success');
                            })();
                        } else {
                            saveAllData();
                            renderStudents();
                            renderHomePreviews();
                            showModal('Success!', `✅ Student updated.`, 'success');
                        }
                    });

                    const deleteBtn = document.createElement('button');
                    deleteBtn.className = 'delete-btn';
                    deleteBtn.innerHTML = '<i class="fas fa-trash"></i>';
                    deleteBtn.title = 'Remove student';
                    deleteBtn.addEventListener('click', (e) => {
                        e.stopPropagation();
                        showConfirmModal(`Remove ${s.name}?`, async (ok) => {
                            if (!ok) return;
                            await deleteFromCloud(`students/${s.id}`);
                            allStudents = allStudents.filter((st) => st.id !== s.id);
                            await saveAllData();
                            renderStudents();
                            renderHomePreviews();
                            showModal('Deleted!', `✅ ${s.name} has been removed.`, 'success');
                        });
                    });

                    controls.appendChild(editBtn);
                    controls.appendChild(deleteBtn);
                }

                div.appendChild(photoDiv);
                div.appendChild(info);
                div.appendChild(controls);
                col.appendChild(div);
            });

            /* Add student */
            if (isAdmin) {
                const addDiv = document.createElement('div');
                addDiv.className = 'student-mini';
                addDiv.style.cssText = 'justify-content:center; cursor:pointer; border:2px dashed #007ACC;';
                addDiv.innerHTML = `<i class="fas fa-plus-circle" style="color:#007ACC; font-size:1.5rem;"></i>
                                    <span style="color:#007ACC; font-weight:600;">Add Student</span>`;
                addDiv.addEventListener('click', () => {
                    const name = prompt('Enter student name:');
                    if (!name) return;
                    const id = prompt('Enter student ID (e.g., ECE/1031/19):');
                    if (!id) return;
                    if (allStudents.some((s) => s.id === id)) {
                        showModal('Error', '❌ This ID already exists.', 'error');
                        return;
                    }
                    const stream = confirm('Click OK for Computer, Cancel for Communication') ? 'Computer' : 'Communication';
                    allStudents.push({ name, id, stream });
                    saveAllData();
                    renderStudents();
                    renderHomePreviews();
                    showModal('Success!', `✅ ${name} has been added.`, 'success');
                });
                col.appendChild(addDiv);
            }

            return col;
        };

        container.innerHTML = '';
        container.appendChild(buildStream('⚡ Electrical & Computer', computer));
        container.appendChild(buildStream('📡 Electrical & Communication', comm));
    }

    /* ============================================================
       COURSES
       ============================================================ */
    function renderCourses() {
        const container = $('#coursesContainer');
        container.innerHTML = '';

        const grouped = {};
        coursesData.forEach((c) => {
            if (!grouped[c.year]) grouped[c.year] = [];
            grouped[c.year].push(c);
        });

        YEAR_ORDER.forEach((year) => {
            if (!grouped[year]) return;

            const yearDiv = document.createElement('div');
            yearDiv.className = 'courses-year scroll-animate';

            const heading = document.createElement('h3');
            heading.className = 'courses-year-title';
            heading.textContent = `${YEAR_EMOJI[year] || '📖'} ${year}`;
            yearDiv.appendChild(heading);

            const grid = document.createElement('div');
            grid.className = 'courses-grid';

            grouped[year].forEach((course) => {
                const idx = coursesData.indexOf(course);
                const item = document.createElement('div');
                item.className = 'course-item' + (isAdmin ? ' admin-mode' : '');
                item.innerHTML = `<div class="course-code">${course.code}</div>
                                  <div class="course-name">${course.name}</div>`;

                if (isAdmin) {
                    const actions = document.createElement('div');
                    actions.className = 'edit-controls';

                    const editBtn = document.createElement('button');
                    editBtn.innerHTML = '<i class="fas fa-pen"></i>';
                    editBtn.title = 'Edit course';
                    editBtn.addEventListener('click', (e) => {
                        e.stopPropagation();
                        const newCode = prompt('Edit course code:', course.code);
                        if (!newCode || !newCode.trim()) return;
                        const newName = prompt('Edit course name:', course.name);
                        if (!newName || !newName.trim()) return;
                        const newYear = prompt('Edit year (Freshman, Sophomore, Junior, Senior, Fifth Year):', course.year);
                        if (!newYear || !newYear.trim()) return;
                        coursesData[idx] = {
                            code: newCode.trim(),
                            name: newName.trim(),
                            year: newYear.trim()
                        };
                        saveAllData();
                        renderCourses();
                        renderHomePreviews();
                        showModal('Success!', `✅ Course "${newCode.trim()}" updated.`, 'success');
                    });

                    const delBtn = document.createElement('button');
                    delBtn.className = 'delete-btn';
                    delBtn.innerHTML = '<i class="fas fa-trash"></i>';
                    delBtn.title = 'Delete course';
                    delBtn.addEventListener('click', (e) => {
                        e.stopPropagation();
                        showConfirmModal(`Delete "${course.code}"?`, (ok) => {
                            if (!ok) return;
                            coursesData.splice(idx, 1);
                            saveAllData();
                            renderCourses();
                            renderHomePreviews();
                            showModal('Deleted!', `✅ "${course.code}" removed.`, 'success');
                        });
                    });

                    actions.appendChild(editBtn);
                    actions.appendChild(delBtn);
                    item.appendChild(actions);
                }

                grid.appendChild(item);
            });

            if (isAdmin) {
                const addItem = document.createElement('div');
                addItem.className = 'course-item add-btn';
                addItem.innerHTML = `<i class="fas fa-plus-circle"></i> Add Course`;
                addItem.addEventListener('click', (e) => {
                    e.stopPropagation();
                    const code = prompt('Enter course code (e.g., ECEG 1011):');
                    if (!code || !code.trim()) return;
                    const name = prompt('Enter course name:');
                    if (!name || !name.trim()) return;
                    coursesData.push({ code: code.trim(), name: name.trim(), year });
                    saveAllData();
                    renderCourses();
                    renderHomePreviews();
                    showModal('Success!', `✅ "${code.trim()}" added to ${year}.`, 'success');
                });
                grid.appendChild(addItem);
            }

            yearDiv.appendChild(grid);
            container.appendChild(yearDiv);
        });
    }

    /* ============================================================
       LECTURERS (Firebase Storage)
       ============================================================ */
    async function renderLecturers() {
        const grid = $('#lecturerGrid');
        grid.innerHTML = '';

        lecturers.forEach((l, idx) => {
            const card = document.createElement('div');
            card.className = 'lecturer-card' + (isAdmin ? ' admin-mode' : '');

            const photoDiv = document.createElement('div');
            photoDiv.className = 'photo-upload';
            const input = document.createElement('input');
            input.type = 'file';
            input.accept = 'image/*';

            const icon = document.createElement('i');
            icon.className = 'fas fa-camera';
            photoDiv.appendChild(icon);
            photoDiv.appendChild(input);

            (async () => {
                const data = await readFromFirestore('lecturerPhotos', String(idx));
                if (data && data.url) {
                    const img = document.createElement('img');
                    img.src = data.url;
                    img.alt = l.name;
                    photoDiv.appendChild(img);
                    icon.style.display = 'none';
                    photoDiv.classList.add('uploaded');
                }
            })();

            if (isAdmin) {
                input.addEventListener('change', async (e) => {
                    const file = e.target.files[0];
                    if (!file) return;
                    try {
                        setCloudStatus('', 'Uploading lecturer photo...');
                        const url = await uploadToCloud(`lecturers/${idx}`, file);
                        await saveToFirestore('lecturerPhotos', String(idx), { url });
                        setCloudStatus('connected', 'Synced');

                        const existing = photoDiv.querySelector('img');
                        if (existing) existing.remove();
                        const ic = photoDiv.querySelector('i');
                        if (ic) ic.style.display = 'none';
                        const img = document.createElement('img');
                        img.src = url;
                        img.alt = l.name;
                        photoDiv.appendChild(img);
                        photoDiv.classList.add('uploaded');
                        showModal('Success!', '✅ Lecturer photo synced to cloud!', 'success');
                        renderHomePreviews();
                    } catch (err) {
                        console.error(err);
                        setCloudStatus('error', 'Upload failed');
                        showModal('Upload Failed', '❌ Could not upload lecturer photo.', 'error');
                    }
                });
            }

            const nameDiv = document.createElement('div');
            nameDiv.className = 'name';
            if (isAdmin) {
                const nameInput = document.createElement('input');
                nameInput.type = 'text';
                nameInput.value = l.name;
                nameInput.className = 'editable-input';
                nameInput.style.width = '140px';
                nameInput.addEventListener('change', function () {
                    l.name = this.value;
                    saveAllData();
                    renderHomePreviews();
                    showModal('Success!', '✅ Lecturer name updated.', 'success');
                });
                nameDiv.appendChild(nameInput);
            } else {
                nameDiv.textContent = l.name;
            }

            const roleDiv = document.createElement('div');
            roleDiv.className = 'role';
            if (isAdmin) {
                const roleInput = document.createElement('input');
                roleInput.type = 'text';
                roleInput.value = l.role;
                roleInput.className = 'editable-input';
                roleInput.style.width = '120px';
                roleInput.addEventListener('change', function () {
                    l.role = this.value;
                    saveAllData();
                    renderHomePreviews();
                    showModal('Success!', '✅ Lecturer role updated.', 'success');
                });
                roleDiv.appendChild(roleInput);
            } else {
                roleDiv.textContent = l.role;
            }

            const controls = document.createElement('div');
            controls.className = 'edit-controls';
            if (isAdmin) {
                const delBtn = document.createElement('button');
                delBtn.className = 'delete-btn';
                delBtn.innerHTML = '<i class="fas fa-trash"></i>';
                delBtn.addEventListener('click', (e) => {
                    e.stopPropagation();
                    showConfirmModal(`Remove ${l.name}?`, async (ok) => {
                        if (!ok) return;
                        await deleteFromCloud(`lecturers/${idx}`);
                        lecturers = lecturers.filter((_, i) => i !== idx);
                        await saveAllData();
                        renderLecturers();
                        renderHomePreviews();
                        showModal('Deleted!', `✅ ${l.name} removed.`, 'success');
                    });
                });
                controls.appendChild(delBtn);
            }

            card.appendChild(photoDiv);
            card.appendChild(nameDiv);
            card.appendChild(roleDiv);
            card.appendChild(controls);
            grid.appendChild(card);
        });

        if (isAdmin) {
            const addCard = document.createElement('div');
            addCard.className = 'lecturer-card';
            addCard.style.cssText = 'justify-content:center; cursor:pointer; border:2px dashed #007ACC;';
            addCard.innerHTML = `<i class="fas fa-plus-circle" style="color:#007ACC; font-size:2rem;"></i>
                                 <div style="color:#007ACC; margin-top:4px; font-weight:600;">Add Lecturer</div>`;
            addCard.addEventListener('click', () => {
                const name = prompt('Enter lecturer name:');
                if (!name) return;
                const role = prompt('Enter role (e.g., Head, Electrical Engineering):');
                if (!role) return;
                lecturers.push({ name, role });
                saveAllData();
                renderLecturers();
                renderHomePreviews();
                showModal('Success!', `✅ ${name} added.`, 'success');
            });
            grid.appendChild(addCard);
        }
    }

    /* ============================================================
       MEMORIES (Firebase Storage)
       ============================================================ */
    function renderMemories() {
        const container = $('#memoryContainer');
        container.innerHTML = '';

        Object.keys(memoryData).forEach((cat) => {
            const catDiv = document.createElement('div');
            catDiv.className = 'mem-category';

            const header = document.createElement('h4');
            header.innerHTML = `<i class="fas fa-folder-open" style="color:#007ACC;"></i> ${cat}`;
            if (isAdmin) {
                const editBtn = document.createElement('button');
                editBtn.innerHTML = '<i class="fas fa-pen"></i>';
                editBtn.className = 'rename-cat-btn';
                editBtn.addEventListener('click', () => {
                    const newName = prompt('Rename category:', cat);
                    if (newName && newName !== cat) {
                        memoryData[newName] = memoryData[cat];
                        delete memoryData[cat];
                        saveAllData();
                        renderMemories();
                        renderHomePreviews();
                        showModal('Success!', `✅ Renamed to "${newName}".`, 'success');
                    }
                });
                header.appendChild(editBtn);
            }
            catDiv.appendChild(header);

            const grid = document.createElement('div');
            grid.className = 'mem-grid';

            memoryData[cat].forEach((item, index) => {
                const card = document.createElement('div');
                card.className = 'mem-card stored';
                const isVideo = item.type && item.type.startsWith('video/');
                const isImage = item.type && item.type.startsWith('image/');

                if (item.url) {
                    if (isVideo) {
                        const v = document.createElement('video');
                        v.src = item.url;
                        v.controls = true;
                        v.className = 'preview-video';
                        v.muted = true;
                        v.addEventListener('click', (e) => {
                            e.stopPropagation();
                            window.openZoom(item.url, 'video');
                        });
                        card.appendChild(v);
                    } else if (isImage) {
                        const img = document.createElement('img');
                        img.src = item.url;
                        img.className = 'preview-img';
                        img.alt = item.name || 'Memory';
                        img.addEventListener('click', (e) => {
                            e.stopPropagation();
                            window.openZoom(item.url, 'image');
                        });
                        card.appendChild(img);
                    } else {
                        const wrap = document.createElement('div');
                        wrap.style.cssText = 'display:flex; flex-direction:column; align-items:center; gap:4px;';
                        wrap.innerHTML = `<i class="fas fa-file" style="font-size:3rem; color:#007ACC;"></i>
                                          <div class="file-name">${item.name || 'File'}</div>`;
                        const link = document.createElement('a');
                        link.href = item.url;
                        link.download = item.name || 'file';
                        link.className = 'download-link';
                        link.innerHTML = '<i class="fas fa-download"></i> Download';
                        wrap.appendChild(link);
                        card.appendChild(wrap);
                    }
                }

                const removeBtn = document.createElement('button');
                removeBtn.className = 'remove-btn';
                removeBtn.innerHTML = '✕';
                if (isAdmin) {
                    removeBtn.addEventListener('click', (e) => {
                        e.stopPropagation();
                        showConfirmModal(`Remove this memory from "${cat}"?`, async (ok) => {
                            if (!ok) return;
                            // Delete from Storage if we have a path
                            if (item.path) await deleteFromCloud(item.path);
                            memoryData[cat].splice(index, 1);
                            await saveAllData();
                            renderMemories();
                            renderHomePreviews();
                            showModal('Deleted!', '✅ Memory removed.', 'success');
                        });
                    });
                } else {
                    removeBtn.style.display = 'none';
                }
                card.appendChild(removeBtn);
                grid.appendChild(card);
            });

            /* Upload card */
            const uploadCard = document.createElement('div');
            uploadCard.className = 'mem-card';
            uploadCard.innerHTML = `
                <i class="fas fa-plus-circle" style="color:#007ACC;"></i>
                <span style="font-weight:600; font-size:0.9rem;">Add to ${cat}</span>
                <span style="font-size:0.7rem; color:#B0B0B0;">Any file type supported</span>
                <input type="file" class="file-input" accept="*/*">`;
            const fileInput = uploadCard.querySelector('.file-input');
            fileInput.addEventListener('change', async function (e) {
                const file = e.target.files[0];
                if (!file) return;
                if (file.size > 10 * 1024 * 1024) {
                    showModal('File Too Large', '⚠️ File must be under 10MB.', 'warning');
                    this.value = '';
                    return;
                }
                try {
                    setCloudStatus('', 'Uploading memory...');
                    const safeName = file.name.replace(/[^a-zA-Z0-9.\-_]/g, '_');
                    const path = `memories/${cat}/${Date.now()}_${safeName}`;
                    const url = await uploadToCloud(path, file);

                    memoryData[cat].push({
                        name: file.name,
                        type: file.type || 'application/octet-stream',
                        url,
                        path
                    });
                    await saveAllData();
                    setCloudStatus('connected', 'Synced');
                    renderMemories();
                    renderHomePreviews();
                    showModal('Success!', `✅ Uploaded "${file.name}" to cloud!`, 'success');
                } catch (err) {
                    console.error(err);
                    setCloudStatus('error', 'Upload failed');
                    showModal('Upload Failed', '❌ Could not upload memory.', 'error');
                }
            });
            uploadCard.addEventListener('click', (e) => {
                if (e.target.tagName !== 'INPUT') fileInput.click();
            });

            grid.appendChild(uploadCard);
            catDiv.appendChild(grid);
            container.appendChild(catDiv);
        });
    }

    /* ============================================================
       GRATITUDE
       ============================================================ */
    function renderGratitude() {
        const grid = $('#gratitudeGrid');
        grid.innerHTML = '';

        gratitudeItems.forEach((g, idx) => {
            const div = document.createElement('div');
            div.className = 'grat-item' + (isAdmin ? ' admin-mode' : '');

            const span = document.createElement('span');
            span.innerHTML = `<i class="fas ${g.icon}"></i> `;

            if (isAdmin) {
                const input = document.createElement('input');
                input.type = 'text';
                input.value = g.label;
                input.className = 'editable-input';
                input.style.width = '120px';
                input.addEventListener('change', function () {
                    g.label = this.value;
                    saveAllData();
                    renderHomePreviews();
                    showModal('Success!', '✅ Gratitude item updated.', 'success');
                });
                span.appendChild(input);
            } else {
                span.appendChild(document.createTextNode(g.label));
            }
            div.appendChild(span);

            const controls = document.createElement('div');
            controls.className = 'edit-controls';
            if (isAdmin) {
                const delBtn = document.createElement('button');
                delBtn.className = 'delete-btn';
                delBtn.innerHTML = '<i class="fas fa-trash"></i>';
                delBtn.addEventListener('click', (e) => {
                    e.stopPropagation();
                    showConfirmModal(`Remove "${g.label}"?`, (ok) => {
                        if (!ok) return;
                        gratitudeItems = gratitudeItems.filter((_, i) => i !== idx);
                        saveAllData();
                        renderGratitude();
                        renderHomePreviews();
                        showModal('Deleted!', '✅ Gratitude item removed.', 'success');
                    });
                });
                controls.appendChild(delBtn);
            }
            div.appendChild(controls);
            grid.appendChild(div);
        });

        if (isAdmin) {
            const addDiv = document.createElement('div');
            addDiv.className = 'grat-item add-btn';
            addDiv.innerHTML = '<i class="fas fa-plus-circle"></i> Add Item';
            addDiv.addEventListener('click', () => {
                const label = prompt('Enter gratitude item:');
                if (!label) return;
                const icon = prompt('Enter icon class (e.g., fa-users):') || 'fa-heart';
                gratitudeItems.push({
                    icon: icon.startsWith('fa-') ? icon : 'fa-' + icon,
                    label
                });
                saveAllData();
                renderGratitude();
                renderHomePreviews();
                showModal('Success!', `✅ "${label}" added.`, 'success');
            });
            grid.appendChild(addDiv);
        }
    }

    /* ============================================================
       GOVERNMENT EDIT CONTROLS
       ============================================================ */
    function renderGov() {
        $$('.gov-block').forEach((block) => {
            block.classList.toggle('admin-mode', isAdmin);
            let controls = block.querySelector('.edit-controls');
            if (!controls) {
                controls = document.createElement('div');
                controls.className = 'edit-controls';
                block.appendChild(controls);
            }
            controls.innerHTML = '';
            if (isAdmin) {
                const editBtn = document.createElement('button');
                editBtn.innerHTML = '<i class="fas fa-pen"></i>';
                editBtn.title = 'Edit content';
                editBtn.addEventListener('click', () => {
                    const content = block.querySelector('.gov-content');
                    if (!content) return;
                    const newContent = prompt('Edit government section content:', content.innerHTML);
                    if (newContent !== null) {
                        content.innerHTML = newContent;
                        saveAllData();
                        showModal('Success!', '✅ Government section updated.', 'success');
                    }
                });
                controls.appendChild(editBtn);
            }
        });
    }

    /* ============================================================
       NAVIGATION
       ============================================================ */
    function setupNavigation() {
        const links = $$('#mainNav a');
        const sections = {
            home: $('#section-home'),
            students: $('#section-students'),
            courses: $('#section-courses'),
            memories: $('#section-memories'),
            lecturers: $('#section-lecturers'),
            gratitude: $('#section-gratitude')
        };

        const navigateTo = (id) => {
            Object.values(sections).forEach((s) => s.classList.remove('active'));
            links.forEach((l) => l.classList.remove('active'));
            if (sections[id]) sections[id].classList.add('active');
            const link = document.querySelector(`#mainNav a[data-section="${id}"]`);
            if (link) link.classList.add('active');
            if (sections[id]) {
                setTimeout(() => sections[id].scrollIntoView({ behavior: 'smooth', block: 'start' }), 100);
            }
        };

        links.forEach((link) => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                navigateTo(link.dataset.section);
            });
        });

        $$('.view-all-link').forEach((link) => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                navigateTo(link.dataset.section);
            });
        });
    }

    /* ============================================================
       ADMIN LOGIN
       ============================================================ */
    function setupAdmin() {
        const loginBtn = $('#adminLoginBtn');
        const logoutBtn = $('#adminLogoutBtn');
        const passInput = $('#adminPass');
        const statusSpan = $('#adminStatus');

        const updateUI = () => {
            if (isAdmin) {
                statusSpan.innerHTML = '<i class="fas fa-user-shield"></i> Admin';
                loginBtn.classList.add('hidden');
                logoutBtn.classList.remove('hidden');
                passInput.classList.add('hidden');
            } else {
                statusSpan.innerHTML = '<i class="fas fa-user"></i> Guest';
                loginBtn.classList.remove('hidden');
                logoutBtn.classList.add('hidden');
                passInput.classList.remove('hidden');
            }
            renderStudents();
            renderCourses();
            renderLecturers();
            renderMemories();
            renderGratitude();
            renderGov();
            renderHomePreviews();
        };

        loginBtn.addEventListener('click', () => {
            if (passInput.value === ADMIN_PASSWORD) {
                isAdmin = true;
                updateUI();
                showModal('Access Granted', '✅ You now have full admin access to edit all content.', 'success');
            } else {
                showModal('Access Denied', '❌ Incorrect password. Please try again.', 'error');
            }
        });

        logoutBtn.addEventListener('click', () => {
            isAdmin = false;
            updateUI();
            showModal('Logged Out', '🔒 You have been logged out successfully.', 'warning');
        });

        passInput.addEventListener('keyup', (e) => {
            if (e.key === 'Enter') loginBtn.click();
        });

        updateUI();
    }

    /* ============================================================
       FIREBASE CONNECTION LISTENER
       ============================================================ */
    async function initFirebase() {
        if (!window.Firebase) {
            setCloudStatus('error', 'Firebase not loaded');
            return;
        }
        FIREBASE = window.Firebase;
        firebaseReady = true;
        setCloudStatus('connected', 'Cloud connected');

        try {
            // Pull data from Firestore
            await loadAllData();
            // Refresh every section with cloud data
            renderStudents();
            renderCourses();
            renderLecturers();
            renderMemories();
            renderGratitude();
            renderGov();
            renderHomePreviews();

            // Live updates: re-render whenever Firestore changes
            if (FIREBASE.onSnapshot) {
                const ref = FIREBASE.doc(FIREBASE.db, 'yearbook', 'main');
                FIREBASE.onSnapshot(ref, (snap) => {
                    if (!snap.exists()) return;
                    const data = snap.data();
                    if (data.students) allStudents = data.students;
                    if (data.lecturers) lecturers = data.lecturers;
                    if (data.gratitude) gratitudeItems = data.gratitude;
                    if (data.memories) memoryData = data.memories;
                    if (data.courses) coursesData = data.courses;
                    renderStudents();
                    renderCourses();
                    renderLecturers();
                    renderMemories();
                    renderGratitude();
                    renderGov();
                    renderHomePreviews();
                });
            }
        } catch (e) {
            console.error(e);
            setCloudStatus('error', 'Sync failed');
        }
    }

    /* ============================================================
       INIT
       ============================================================ */
    function init() {
        // These run regardless of Firebase readiness
        setupNavigation();
        setupAdmin();          // Renders with in-memory defaults first
        setupZoom();
        setupScrollAnimations();
        setupScrollProgress();
        setTimeout(setupLogoUpload, 100);

        // Wait for Firebase module to fire 'firebase-ready'
        window.addEventListener('firebase-ready', initFirebase);
        // In case the module already loaded before our listener
        if (window.Firebase) initFirebase();
        else {
            // Fallback: try again in 2 seconds
            setTimeout(() => { if (window.Firebase) initFirebase(); }, 2000);
        }

        console.log('🎓 ECE 2019EC Yearbook · Nimo Graphics');
        console.log('🔑 Admin password: admin123');
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();