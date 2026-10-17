(() => {
    'use strict';

    const ADMIN_PASSWORD = 'admin123'; // Demo only; do not use as real authentication.
    const STORAGE_KEY = 'ece_yearbook_data';
    const LOGO_KEY = 'school_logo';
    const MAX_MEMORY_BYTES = 10 * 1024 * 1024;
    const MAX_IMAGE_BYTES = 2 * 1024 * 1024;

    const $ = (selector, root = document) => root.querySelector(selector);
    const $$ = (selector, root = document) => [...root.querySelectorAll(selector)];

    const yearOrder = ['Freshman', 'Sophomore', 'Junior', 'Senior', 'Fifth Year'];
    const yearEmoji = {
        Freshman: '',
        Sophomore: '',
        Junior: '',
        Senior: '',
        'Fifth Year': ''
    };

    let isAdmin = false;

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
        Trip: [],
        Graduation: [],
        'Lab Sessions': [],
        Events: [],
        Other: []
    };

    let coursesData = [
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
        { code: 'ECEG 3011', name: 'Communication Systems I', year: 'Junior' },
        { code: 'ECEG 3012', name: 'Communication Systems II', year: 'Junior' },
        { code: 'ECEG 3013', name: 'Control Systems I', year: 'Junior' },
        { code: 'ECEG 3017', name: 'Microprocessors and Interfacing', year: 'Junior' },
        { code: 'ECEG 3018', name: 'Electromagnetic Fields', year: 'Junior' },
        { code: 'ECEG 3019', name: 'Digital Signal Processing', year: 'Junior' },
        { code: 'ECEG 3020', name: 'Embedded Systems', year: 'Junior' },
        { code: 'ECEG 3022', name: 'Network Analysis', year: 'Junior' }
    ];

    function showModal(title, message, type = 'info', callback) {
        const modal = $('#customModal');
        const icon = $('#modalIcon');
        const button = $('#modalBtn');
        if (!modal || !icon || !button) return;

        const iconClasses = {
            success: 'fa-check-circle',
            error: 'fa-times-circle',
            warning: 'fa-info-circle',
            info: 'fa-info-circle'
        };
        const colors = {
            success: '#007ACC',
            error: '#D32F2F',
            warning: '#FFA000',
            info: '#007ACC'
        };

        icon.replaceChildren();
        const i = document.createElement('i');
        i.className = `fas ${iconClasses[type] || iconClasses.info}`;
        i.style.color = colors[type] || colors.info;
        icon.appendChild(i);

        $('#modalTitle').textContent = title;
        $('#modalMessage').textContent = message;
        button.style.background = colors[type] || colors.info;
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';

        const close = () => {
            modal.classList.remove('active');
            document.body.style.overflow = '';
            button.removeEventListener('click', close);
            document.removeEventListener('keydown', onKey);
            modal.removeEventListener('click', onBackdrop);
            callback?.();
        };
        const onKey = event => {
            if (event.key === 'Escape') close();
        };
        const onBackdrop = event => {
            if (event.target === modal) close();
        };

        button.addEventListener('click', close);
        document.addEventListener('keydown', onKey);
        modal.addEventListener('click', onBackdrop);
    }

    function showConfirmModal(message, callback) {
        const modal = $('#confirmModal');
        const ok = $('#confirmOk');
        const cancel = $('#confirmCancel');
        if (!modal || !ok || !cancel) return;

        $('#confirmMessage').textContent = message;
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';

        const cleanup = () => {
            modal.classList.remove('active');
            document.body.style.overflow = '';
            ok.removeEventListener('click', onOk);
            cancel.removeEventListener('click', onCancel);
            document.removeEventListener('keydown', onKey);
            modal.removeEventListener('click', onBackdrop);
        };
        const onOk = () => {
            cleanup();
            callback?.(true);
        };
        const onCancel = () => {
            cleanup();
            callback?.(false);
        };
        const onKey = event => {
            if (event.key === 'Escape') onCancel();
        };
        const onBackdrop = event => {
            if (event.target === modal) onCancel();
        };

        ok.addEventListener('click', onOk);
        cancel.addEventListener('click', onCancel);
        document.addEventListener('keydown', onKey);
        modal.addEventListener('click', onBackdrop);
    }

    function saveAllData() {
        try {
            localStorage.setItem(STORAGE_KEY, JSON.stringify({
                students: allStudents,
                lecturers,
                gratitude: gratitudeItems,
                memories: memoryData,
                courses: coursesData
            }));
            return true;
        } catch (error) {
            showModal(
                'Storage full',
                'Could not save changes. Remove some large uploads or use smaller files.',
                'warning'
            );
            return false;
        }
    }

    function loadAllData() {
        try {
            const raw = localStorage.getItem(STORAGE_KEY);
            if (!raw) return;
            const data = JSON.parse(raw);

            if (Array.isArray(data.students)) allStudents = data.students;
            if (Array.isArray(data.lecturers)) lecturers = data.lecturers;
            if (Array.isArray(data.gratitude)) gratitudeItems = data.gratitude;
            if (Array.isArray(data.courses)) coursesData = data.courses;

            if (data.memories && typeof data.memories === 'object') {
                memoryData = { ...memoryData, ...data.memories };
                Object.keys(memoryData).forEach(category => {
                    if (!Array.isArray(memoryData[category])) memoryData[category] = [];
                });
            }
        } catch (error) {
            console.warn('Saved yearbook data could not be read.', error);
        }
    }

    function makeButton(iconClass, title, onClick, danger = false) {
        const button = document.createElement('button');
        button.type = 'button';
        button.title = title;
        button.setAttribute('aria-label', title);
        if (danger) button.classList.add('delete-btn');
        const icon = document.createElement('i');
        icon.className = `fas ${iconClass}`;
        button.appendChild(icon);
        button.addEventListener('click', onClick);
        return button;
    }

    function updatePreviews() {
        const studentPreview = $('#homeStudentPreview');
        const coursePreview = $('#homeCoursesPreview');
        const memoryPreview = $('#homeMemoryPreview');
        const lecturerPreview = $('#homeLecturerPreview');
        const gratitudePreview = $('#homeGratitudePreview');

        if (!studentPreview) return;

        studentPreview.replaceChildren();
        allStudents.slice(0, 6).forEach(student => {
            const item = document.createElement('div');
            item.className = 'home-preview-item';
            const photo = localStorage.getItem(`photo_${student.id}`);
            if (photo) {
                const img = document.createElement('img');
                img.src = photo;
                img.alt = student.name;
                img.className = 'preview-photo';
                item.appendChild(img);
            } else {
                const icon = document.createElement('i');
                icon.className = 'fas fa-user-circle';
                item.appendChild(icon);
            }
            const name = document.createElement('div');
            name.className = 'label';
            name.textContent = student.name;
            const id = document.createElement('div');
            id.className = 'count';
            id.textContent = student.id;
            item.append(name, id);
            studentPreview.appendChild(item);
        });

        if (coursePreview) {
            coursePreview.replaceChildren();
            coursesData.slice(0, 6).forEach(course => {
                const item = document.createElement('div');
                item.className = 'home-preview-item';
                const icon = document.createElement('i');
                icon.className = 'fas fa-book';
                const code = document.createElement('div');
                code.className = 'label';
                code.textContent = course.code;
                const name = document.createElement('div');
                name.className = 'count';
                name.textContent = course.name;
                item.append(icon, code, name);
                coursePreview.appendChild(item);
            });
        }

        if (memoryPreview) {
            memoryPreview.replaceChildren();
            const memories = Object.entries(memoryData)
                .flatMap(([category, items]) => items.map(item => ({ ...item, category })))
                .slice(0, 4);

            if (!memories.length) {
                const item = document.createElement('div');
                item.className = 'home-preview-item';
                item.textContent = 'No memories yet';
                memoryPreview.appendChild(item);
            } else {
                memories.forEach(memory => {
                    const item = document.createElement('div');
                    item.className = 'home-preview-item';
                    const label = document.createElement('div');
                    label.className = 'count';
                    label.textContent = memory.category;
                    if (memory.type?.startsWith('image/') && memory.data) {
                        const img = document.createElement('img');
                        img.src = memory.data;
                        img.alt = memory.name || 'Memory';
                        img.className = 'preview-img-sm';
                        item.appendChild(img);
                    } else {
                        const icon = document.createElement('i');
                        icon.className = `fas ${memory.type?.startsWith('video/') ? 'fa-video' : 'fa-file'}`;
                        item.appendChild(icon);
                    }
                    item.appendChild(label);
                    memoryPreview.appendChild(item);
                });
            }
        }

        if (lecturerPreview) {
            lecturerPreview.replaceChildren();
            lecturers.slice(0, 6).forEach((lecturer, index) => {
                const item = document.createElement('div');
                item.className = 'home-preview-item';
                const photo = localStorage.getItem(`lecturer_photo_${index}`);
                if (photo) {
                    const img = document.createElement('img');
                    img.src = photo;
                    img.alt = lecturer.name;
                    img.className = 'preview-photo';
                    item.appendChild(img);
                } else {
                    const icon = document.createElement('i');
                    icon.className = 'fas fa-user-tie';
                    item.appendChild(icon);
                }
                const name = document.createElement('div');
                name.className = 'label';
                name.textContent = lecturer.name;
                const role = document.createElement('div');
                role.className = 'count';
                role.textContent = lecturer.role;
                item.append(name, role);
                lecturerPreview.appendChild(item);
            });
        }

        if (gratitudePreview) {
            gratitudePreview.replaceChildren();
            gratitudeItems.slice(0, 6).forEach(item => {
                const div = document.createElement('div');
                div.className = 'home-preview-item';
                const icon = document.createElement('i');
                icon.className = `fas ${item.icon}`;
                const label = document.createElement('div');
                label.className = 'label';
                label.textContent = item.label;
                div.append(icon, label);
                gratitudePreview.appendChild(div);
            });
        }
    }

    function storeImage(file, key, onDone) {
        if (!file || !file.type.startsWith('image/')) {
            showModal('Invalid file', 'Please select an image file.', 'warning');
            return;
        }
        if (file.size > MAX_IMAGE_BYTES) {
            showModal('File too large', 'Images must be 2 MB or smaller.', 'warning');
            return;
        }

        const reader = new FileReader();
        reader.onerror = () => showModal('Upload failed', 'The image could not be read.', 'error');
        reader.onload = () => {
            try {
                localStorage.setItem(key, reader.result);
                onDone(reader.result);
            } catch {
                showModal('Storage full', 'Could not save this image. Try a smaller file.', 'warning');
            }
        };
        reader.readAsDataURL(file);
    }

    function setupLogo() {
        const holder = $('#logoPlaceholder');
        if (!holder) return;

        const paintLogo = data => {
            holder.replaceChildren();
            if (data) {
                const img = document.createElement('img');
                img.src = data;
                img.alt = 'University logo';
                holder.appendChild(img);
            } else {
                const icon = document.createElement('i');
                icon.className = 'fas fa-university';
                holder.appendChild(icon);
            }
            const input = document.createElement('input');
            input.type = 'file';
            input.id = 'logoUpload';
            input.accept = 'image/*';
            input.setAttribute('aria-label', 'Upload university logo');
            holder.appendChild(input);
            input.addEventListener('change', event => {
                if (!isAdmin) {
                    event.target.value = '';
                    showModal('Access denied', 'Admin login is required to change the logo.', 'error');
                    return;
                }
                storeImage(event.target.files[0], LOGO_KEY, paintLogo);
            });
        };

        paintLogo(localStorage.getItem(LOGO_KEY));
    }

    function setupStudentPhoto(photoDiv, student) {
        const input = document.createElement('input');
        input.type = 'file';
        input.accept = 'image/*';
        input.setAttribute('aria-label', `Upload photo for ${student.name}`);

        const renderPhoto = data => {
            photoDiv.replaceChildren();
            if (data) {
                const img = document.createElement('img');
                img.src = data;
                img.alt = student.name;
                photoDiv.appendChild(img);
                photoDiv.classList.add('uploaded');
            } else {
                const icon = document.createElement('i');
                icon.className = 'fas fa-camera';
                photoDiv.appendChild(icon);
                photoDiv.classList.remove('uploaded');
            }
            if (isAdmin) photoDiv.appendChild(input);
        };

        renderPhoto(localStorage.getItem(`photo_${student.id}`));
        if (isAdmin) {
            input.addEventListener('change', event => {
                storeImage(event.target.files[0], `photo_${student.id}`, data => {
                    renderPhoto(data);
                    updatePreviews();
                });
            });
        }
    }

    function renderStudents() {
        const container = $('#studentStreams');
        if (!container) return;
        container.replaceChildren();

        const buildStream = (title, stream) => {
            const column = document.createElement('div');
            column.className = 'stream-col';
            const heading = document.createElement('h3');
            heading.textContent = title;
            column.appendChild(heading);

            allStudents.filter(student => student.stream === stream).forEach(student => {
                const row = document.createElement('div');
                row.className = `student-mini${isAdmin ? ' admin-mode' : ''}`;

                const photo = document.createElement('div');
                photo.className = 'photo-upload';
                setupStudentPhoto(photo, student);

                const info = document.createElement('div');
                info.className = 'info';
                const name = document.createElement('div');
                name.className = 'name';
                name.textContent = student.name;
                const id = document.createElement('div');
                id.className = 'id';
                id.textContent = student.id;
                info.append(name, id);
                row.append(photo, info);

                const controls = document.createElement('div');
                controls.className = 'edit-controls';
                if (isAdmin) {
                    controls.append(
                        makeButton('fa-pen', 'Edit student', () => {
                            const newName = prompt('Enter student name:', student.name)?.trim();
                            if (!newName) return;
                            const newId = prompt('Enter student ID:', student.id)?.trim();
                            if (!newId) return;
                            if (newId !== student.id && allStudents.some(s => s.id === newId)) {
                                showModal('Duplicate ID', 'That student ID is already in use.', 'error');
                                return;
                            }
                            const oldId = student.id;
                            student.name = newName;
                            student.id = newId;
                            const photoData = localStorage.getItem(`photo_${oldId}`);
                            if (photoData && oldId !== newId) {
                                localStorage.setItem(`photo_${newId}`, photoData);
                                localStorage.removeItem(`photo_${oldId}`);
                            }
                            saveAllData();
                            renderStudents();
                            updatePreviews();
                        }),
                        makeButton('fa-trash', 'Delete student', () => {
                            showConfirmModal(`Remove ${student.name}?`, confirmed => {
                                if (!confirmed) return;
                                allStudents = allStudents.filter(item => item !== student);
                                localStorage.removeItem(`photo_${student.id}`);
                                saveAllData();
                                renderStudents();
                                updatePreviews();
                            });
                        }, true)
                    );
                }
                row.appendChild(controls);
                column.appendChild(row);
            });

            if (isAdmin) {
                const add = document.createElement('button');
                add.type = 'button';
                add.className = 'student-mini';
                add.textContent = '+ Add Student';
                add.addEventListener('click', () => {
                    const name = prompt('Enter student name:')?.trim();
                    if (!name) return;
                    const id = prompt('Enter student ID:')?.trim();
                    if (!id) return;
                    if (allStudents.some(student => student.id === id)) {
                        showModal('Duplicate ID', 'That student ID is already in use.', 'error');
                        return;
                    }
                    const stream = confirm('Choose OK for Computer, Cancel for Communication.')
                        ? 'Computer'
                        : 'Communication';
                    allStudents.push({ name, id, stream });
                    saveAllData();
                    renderStudents();
                    updatePreviews();
                });
                column.appendChild(add);
            }
            return column;
        };

        container.append(
            buildStream('⚡ Electrical & Computer', 'Computer'),
            buildStream('📡 Electrical & Communication', 'Communication')
        );
    }

    function renderCourses() {
        const container = $('#coursesContainer');
        if (!container) return;
        container.replaceChildren();

        const groups = new Map();
        coursesData.forEach(course => {
            if (!groups.has(course.year)) groups.set(course.year, []);
            groups.get(course.year).push(course);
        });

        [...yearOrder, ...[...groups.keys()].filter(year => !yearOrder.includes(year))]
            .forEach(year => {
                const courses = groups.get(year);
                if (!courses) return;

                const section = document.createElement('div');
                section.className = 'courses-year';
                const heading = document.createElement('h3');
                heading.className = 'courses-year-title';
                heading.textContent = `${yearEmoji[year] || '📖'} ${year}`;
                const grid = document.createElement('div');
                grid.className = 'courses-grid';

                courses.forEach(course => {
                    const item = document.createElement('div');
                    item.className = `course-item${isAdmin ? ' admin-mode' : ''}`;
                    const code = document.createElement('div');
                    code.className = 'course-code';
                    code.textContent = course.code;
                    const name = document.createElement('div');
                    name.className = 'course-name';
                    name.textContent = course.name;
                    item.append(code, name);

                    if (isAdmin) {
                        const actions = document.createElement('div');
                        actions.className = 'edit-controls';
                        actions.append(
                            makeButton('fa-pen', 'Edit course', () => {
                                const newCode = prompt('Course code:', course.code)?.trim();
                                const newName = prompt('Course name:', course.name)?.trim();
                                const newYear = prompt(
                                    'Year (, Sophomore, Junior, Senior, Fifth Year):',
                                    course.year
                                )?.trim();
                                if (!newCode || !newName || !newYear) return;
                                Object.assign(course, { code: newCode, name: newName, year: newYear });
                                saveAllData();
                                renderCourses();
                                updatePreviews();
                            }),
                            makeButton('fa-trash', 'Delete course', () => {
                                showConfirmModal(`Delete ${course.code}?`, confirmed => {
                                    if (!confirmed) return;
                                    coursesData = coursesData.filter(item => item !== course);
                                    saveAllData();
                                    renderCourses();
                                    updatePreviews();
                                });
                            }, true)
                        );
                        item.appendChild(actions);
                    }
                    grid.appendChild(item);
                });

                if (isAdmin) {
                    const add = document.createElement('button');
                    add.type = 'button';
                    add.className = 'course-item add-btn';
                    add.textContent = '+ Add Course';
                    add.addEventListener('click', () => {
                        const code = prompt('Course code:')?.trim();
                        const name = prompt('Course name:')?.trim();
                        if (!code || !name) return;
                        coursesData.push({ code, name, year });
                        saveAllData();
                        renderCourses();
                        updatePreviews();
                    });
                    grid.appendChild(add);
                }

                section.append(heading, grid);
                container.appendChild(section);
            });
    }

    function renderLecturers() {
        const grid = $('#lecturerGrid');
        if (!grid) return;
        grid.replaceChildren();

        lecturers.forEach((lecturer, index) => {
            const card = document.createElement('div');
            card.className = 'lecturer-card';

            const photo = document.createElement('div');
            photo.className = 'photo-upload';
            const input = document.createElement('input');
            input.type = 'file';
            input.accept = 'image/*';
            input.setAttribute('aria-label', `Upload photo for ${lecturer.name}`);

            const drawPhoto = data => {
                photo.replaceChildren();
                if (data) {
                    const img = document.createElement('img');
                    img.src = data;
                    img.alt = lecturer.name;
                    photo.appendChild(img);
                    photo.classList.add('uploaded');
                } else {
                    const icon = document.createElement('i');
                    icon.className = 'fas fa-camera';
                    photo.appendChild(icon);
                    photo.classList.remove('uploaded');
                }
                if (isAdmin) photo.appendChild(input);
            };
            drawPhoto(localStorage.getItem(`lecturer_photo_${index}`));

            if (isAdmin) {
                input.addEventListener('change', event => {
                    storeImage(event.target.files[0], `lecturer_photo_${index}`, data => {
                        drawPhoto(data);
                        updatePreviews();
                    });
                });
            }

            const name = document.createElement(isAdmin ? 'input' : 'div');
            name.className = 'name';
            if (isAdmin) {
                name.value = lecturer.name;
                name.classList.add('editable-input');
                name.addEventListener('change', () => {
                    lecturer.name = name.value.trim() || lecturer.name;
                    saveAllData();
                    updatePreviews();
                });
            } else {
                name.textContent = lecturer.name;
            }

            const role = document.createElement(isAdmin ? 'input' : 'div');
            role.className = 'role';
            if (isAdmin) {
                role.value = lecturer.role;
                role.classList.add('editable-input');
                role.addEventListener('change', () => {
                    lecturer.role = role.value.trim() || lecturer.role;
                    saveAllData();
                    updatePreviews();
                });
            } else {
                role.textContent = lecturer.role;
            }

            card.append(photo, name, role);

            if (isAdmin) {
                card.classList.add('admin-mode');
                const controls = document.createElement('div');
                controls.className = 'edit-controls';
                controls.appendChild(makeButton('fa-trash', 'Delete lecturer', () => {
                    showConfirmModal(`Remove ${lecturer.name}?`, confirmed => {
                        if (!confirmed) return;
                        lecturers = lecturers.filter(item => item !== lecturer);
                        saveAllData();
                        renderLecturers();
                        updatePreviews();
                    });
                }, true));
                card.appendChild(controls);
            }
            grid.appendChild(card);
        });

        if (isAdmin) {
            const add = document.createElement('button');
            add.type = 'button';
            add.className = 'lecturer-card';
            add.textContent = '+ Add Lecturer';
            add.addEventListener('click', () => {
                const name = prompt('Lecturer name:')?.trim();
                const role = prompt('Role:')?.trim();
                if (!name || !role) return;
                lecturers.push({ name, role });
                saveAllData();
                renderLecturers();
                updatePreviews();
            });
            grid.appendChild(add);
        }
    }

    function renderMemories() {
        const container = $('#memoryContainer');
        if (!container) return;
        container.replaceChildren();

        Object.entries(memoryData).forEach(([category, items]) => {
            const section = document.createElement('div');
            section.className = 'mem-category';

            const heading = document.createElement('h4');
            const icon = document.createElement('i');
            icon.className = 'fas fa-folder-open';
            const label = document.createElement('span');
            label.textContent = category;
            heading.append(icon, label);

            if (isAdmin) {
                const rename = document.createElement('button');
                rename.type = 'button';
                rename.className = 'rename-cat-btn';
                rename.textContent = 'Rename';
                rename.addEventListener('click', () => {
                    const newName = prompt('New category name:', category)?.trim();
                    if (!newName || newName === category) return;
                    if (memoryData[newName]) {
                        showModal('Category exists', 'Choose a different category name.', 'warning');
                        return;
                    }
                    memoryData[newName] = memoryData[category];
                    delete memoryData[category];
                    saveAllData();
                    renderMemories();
                    updatePreviews();
                });
                heading.appendChild(rename);
            }

            const grid = document.createElement('div');
            grid.className = 'mem-grid';

            items.forEach((memory, index) => {
                const card = document.createElement('div');
                card.className = 'mem-card stored';

                if (memory.type?.startsWith('image/') && memory.data) {
                    const img = document.createElement('img');
                    img.src = memory.data;
                    img.alt = memory.name || 'Memory';
                    img.className = 'preview-img';
                    img.addEventListener('click', () => openZoom(memory.data, 'image'));
                    card.appendChild(img);
                } else if (memory.type?.startsWith('video/') && memory.data) {
                    const video = document.createElement('video');
                    video.src = memory.data;
                    video.controls = true;
                    video.className = 'preview-video';
                    video.addEventListener('click', event => {
                        event.preventDefault();
                        openZoom(memory.data, 'video');
                    });
                    card.appendChild(video);
                } else {
                    const filename = document.createElement('div');
                    filename.className = 'file-name';
                    filename.textContent = memory.name || 'File';
                    const download = document.createElement('a');
                    download.href = memory.data;
                    download.download = memory.name || 'file';
                    download.className = 'download-link';
                    download.textContent = 'Download';
                    card.append(filename, download);
                }

                if (isAdmin) {
                    const remove = document.createElement('button');
                    remove.type = 'button';
                    remove.className = 'remove-btn';
                    remove.textContent = '×';
                    remove.setAttribute('aria-label', 'Remove memory');
                    remove.addEventListener('click', () => {
                        showConfirmModal(`Remove this memory from "${category}"?`, confirmed => {
                            if (!confirmed) return;
                            memoryData[category].splice(index, 1);
                            saveAllData();
                            renderMemories();
                            updatePreviews();
                        });
                    });
                    card.appendChild(remove);
                }
                grid.appendChild(card);
            });

            const upload = document.createElement('div');
            upload.className = 'mem-card';
            const uploadTitle = document.createElement('span');
            uploadTitle.textContent = `Add to ${category}`;
            const input = document.createElement('input');
            input.type = 'file';
            input.className = 'file-input';
            input.setAttribute('aria-label', `Upload file to ${category}`);
            upload.append(uploadTitle, input);

            input.addEventListener('change', () => {
                const file = input.files?.[0];
                if (!file) return;
                if (file.size > MAX_MEMORY_BYTES) {
                    showModal('File too large', 'Files must be 10 MB or smaller.', 'warning');
                    input.value = '';
                    return;
                }
                const reader = new FileReader();
                reader.onerror = () => showModal('Upload failed', 'The file could not be read.', 'error');
                reader.onload = () => {
                    memoryData[category].push({
                        name: file.name,
                        type: file.type || 'application/octet-stream',
                        data: reader.result
                    });
                    if (saveAllData()) {
                        renderMemories();
                        updatePreviews();
                    } else {
                        memoryData[category].pop();
                    }
                };
                reader.readAsDataURL(file);
            });

            section.append(heading, grid);
            grid.appendChild(upload);
            container.appendChild(section);
        });
    }

    function renderGratitude() {
        const grid = $('#gratitudeGrid');
        if (!grid) return;
        grid.replaceChildren();

        gratitudeItems.forEach(item => {
            const card = document.createElement('div');
            card.className = `grat-item${isAdmin ? ' admin-mode' : ''}`;
            const text = document.createElement('span');
            const icon = document.createElement('i');
            icon.className = `fas ${item.icon}`;
            text.append(icon, document.createTextNode(` ${item.label}`));
            card.appendChild(text);

            if (isAdmin) {
                const controls = document.createElement('div');
                controls.className = 'edit-controls';
                controls.appendChild(makeButton('fa-pen', 'Edit gratitude item', () => {
                    const label = prompt('Gratitude item:', item.label)?.trim();
                    if (!label) return;
                    item.label = label;
                    saveAllData();
                    renderGratitude();
                    updatePreviews();
                }));
                controls.appendChild(makeButton('fa-trash', 'Delete gratitude item', () => {
                    showConfirmModal(`Remove "${item.label}"?`, confirmed => {
                        if (!confirmed) return;
                        gratitudeItems = gratitudeItems.filter(entry => entry !== item);
                        saveAllData();
                        renderGratitude();
                        updatePreviews();
                    });
                }, true));
                card.appendChild(controls);
            }
            grid.appendChild(card);
        });

        if (isAdmin) {
            const add = document.createElement('button');
            add.type = 'button';
            add.className = 'grat-item add-btn';
            add.textContent = '+ Add Item';
            add.addEventListener('click', () => {
                const label = prompt('Gratitude item:')?.trim();
                if (!label) return;
                gratitudeItems.push({ icon: 'fa-heart', label });
                saveAllData();
                renderGratitude();
                updatePreviews();
            });
            grid.appendChild(add);
        }
    }

    function renderGov() {
        $$('.gov-block').forEach(block => {
            let controls = $('.edit-controls', block);
            if (!controls) {
                controls = document.createElement('div');
                controls.className = 'edit-controls';
                block.appendChild(controls);
            }
            controls.replaceChildren();
            block.classList.toggle('admin-mode', isAdmin);

            if (isAdmin) {
                controls.appendChild(makeButton('fa-pen', 'Edit government section', () => {
                    const content = $('.gov-content', block);
                    const editor = $('#govEditor');
                    if (!content || !editor) {
                        showModal('Editor unavailable', 'Add the govEditor textarea to the HTML first.', 'warning');
                        return;
                    }
                    editor.value = content.innerText;
                    editor.classList.remove('hidden');
                    editor.focus();
                    showConfirmModal('Save the edited government information?', confirmed => {
                        if (confirmed) {
                            content.textContent = editor.value;
                            saveAllData();
                        }
                        editor.classList.add('hidden');
                    });
                }));
            }
        });
    }

    function openZoom(src, type) {
        const modal = $('#zoomModal');
        const content = $('#zoomContent');
        if (!modal || !content) return;

        content.replaceChildren();
        const element = document.createElement(type === 'video' ? 'video' : 'img');
        element.src = src;
        element.className = type === 'video' ? 'zoom-video' : 'zoom-content';
        if (type === 'video') {
            element.controls = true;
            element.autoplay = true;
        } else {
            element.alt = 'Memory image';
        }
        content.appendChild(element);
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    function closeZoom() {
        const modal = $('#zoomModal');
        const content = $('#zoomContent');
        if (!modal || !content) return;
        $('video', content)?.pause();
        content.replaceChildren();
        modal.classList.remove('active');
        document.body.style.overflow = '';
    }

    function renderAll() {
        renderStudents();
        renderCourses();
        renderLecturers();
        renderMemories();
        renderGratitude();
        renderGov();
        updatePreviews();
    }

    function setupNavigation() {
        const sections = {
            home: $('#section-home'),
            students: $('#section-students'),
            courses: $('#section-courses'),
            memories: $('#section-memories'),
            lecturers: $('#section-lecturers'),
            gratitude: $('#section-gratitude')
        };

        const navigate = id => {
            Object.values(sections).forEach(section => section?.classList.remove('active'));
            $$('#mainNav a').forEach(link => link.classList.remove('active'));
            sections[id]?.classList.add('active');
            $(`#mainNav a[data-section="${id}"]`)?.classList.add('active');
            sections[id]?.scrollIntoView({ behavior: 'smooth', block: 'start' });
        };

        document.addEventListener('click', event => {
            const link = event.target.closest('[data-section]');
            if (!link) return;
            event.preventDefault();
            navigate(link.dataset.section);
        });
    }

    function setupAdmin() {
        const password = $('#adminPass');
        const login = $('#adminLoginBtn');
        const logout = $('#adminLogoutBtn');
        const status = $('#adminStatus');

        const refresh = () => {
            status.innerHTML = isAdmin
                ? '<i class="fas fa-user-shield"></i> Admin'
                : '<i class="fas fa-user"></i> Guest';
            login.classList.toggle('hidden', isAdmin);
            logout.classList.toggle('hidden', !isAdmin);
            password.classList.toggle('hidden', isAdmin);
            renderAll();
            setupLogo();
        };

        login.addEventListener('click', () => {
            if (password.value === ADMIN_PASSWORD) {
                isAdmin = true;
                password.value = '';
                refresh();
                showModal('Access granted', 'You are now in demo admin mode.', 'success');
            } else {
                showModal('Access denied', 'Incorrect password.', 'error');
            }
        });

        logout.addEventListener('click', () => {
            isAdmin = false;
            refresh();
            showModal('Logged out', 'You have been logged out.', 'info');
        });

        password.addEventListener('keydown', event => {
            if (event.key === 'Enter') login.click();
        });

        refresh();
    }

    function setupScroll() {
        const bar = document.createElement('div');
        bar.className = 'scroll-progress';
        document.body.prepend(bar);

        const update = () => {
            const max = document.documentElement.scrollHeight - window.innerHeight;
            bar.style.width = `${max > 0 ? (window.scrollY / max) * 100 : 0}%`;
        };
        window.addEventListener('scroll', update, { passive: true });
        window.addEventListener('resize', update);

        if ('IntersectionObserver' in window) {
            const observer = new IntersectionObserver(entries => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) entry.target.classList.add('visible');
                });
            }, { threshold: 0.1 });
            $$('.scroll-animate').forEach(element => observer.observe(element));
        } else {
            $$('.scroll-animate').forEach(element => element.classList.add('visible'));
        }
        update();
    }

    $('#zoomClose')?.addEventListener('click', closeZoom);
    $('#zoomModal')?.addEventListener('click', event => {
        if (event.target === $('#zoomModal')) closeZoom();
    });
    document.addEventListener('keydown', event => {
        if (event.key === 'Escape') closeZoom();
    });

    loadAllData();
    setupNavigation();
    setupScroll();
    setupAdmin();

    console.log('ECE 2019EC Yearbook loaded. Demo admin password: admin123');
})();
