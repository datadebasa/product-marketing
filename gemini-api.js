
    const chatbox = document.getElementById('chatbox');
    const chatBtn = document.getElementById('chat-btn');
    const closeChat = document.getElementById('close-chat');

    // Fungsi untuk menampilkan dan menyembunyikan chatbox
    function toggleChat() {
        if (chatbox.style.display === 'none' || chatbox.style.display === '') {
            chatbox.style.display = 'flex';
            chatBtn.style.display = 'none';
        } else {
            chatbox.style.display = 'none';
        }
    }

    // Menutup chatbox ketika tombol close di klik
    closeChat.addEventListener('click', () => {
        chatbox.style.display = 'none';
        chatBtn.style.display = 'flex';
    });

    function displayMessage(message, sender) {
        const chatContent = document.getElementById('chat-content');
        const messageElement = document.createElement('div');
        messageElement.classList.add('message', sender === 'user' ? 'text-end' : 'text-start');
        messageElement.classList.add('mb-2');
        messageElement.innerHTML = `
            <div class="rounded-3 p-2" style="background-color: ${sender === 'user' ? '#DCF8C6' : '#E5E5EA'};">
                ${message}
            </div>
        `;
        chatContent.appendChild(messageElement);
        chatContent.scrollTop = chatContent.scrollHeight; // Scroll otomatis ke bawah
    }

    function sendMessage() {
        const userInput = document.getElementById('user-input');
        const userMessage = userInput.value.trim();
        if (userMessage !== '') {
            displayMessage(userMessage, 'user');
            userInput.value = ''; // Kosongkan input

            // Kirimkan permintaan ke API
            const data = {
                "contents": [{
                    "parts": [{"text":`kamu bertindak sebgai seorang penjual produk dimana user mengirimkan sebuah pesan : {`+ userMessage +`} yang dikirmkan dari dia saat mengunjungi website  Usahakan chat yang di 
                    kembalikan lebih humanis dan tidak kaku seperti robot. hilangkan kata kata tidak penting
                    
                    list harga yang di tawarkan (jawab ketika user menanyakan dan kirimkan link pembelian jika user sudah memilih): 
                    auto posting blogger life time : harga 500k diskon jadi 200k link pembelian : https://butabuku.myr.id/app/auto-posting-blogger
                    auto posting exblog life time : harga 500k diskon jadi 200k link pembelian : https://butabuku.myr.id/app/auto-posting-exblog
                    auto posting Wordpress life time : harga 500k diskon jadi 200k link pembelian : https://butabuku.myr.id/app/auto-posting-wordpress  

                    

                    selain itu juga saya menawarkan jasa desain (jawab ketika user menanyakan dan kirimkan link pembelian jika user sudah memilih): 
                    Logo Design : harga 50k diskon jadi 25k link pembelian : https://wa.me/6282249883990?text=Saya%20tertarik%20dengan%20jasa%20desain%20logo
                    Flyer & Pamphlet Design : harga 75k diskon jadi 50k link pembelian : https://wa.me/6282249883990?text=Saya%20tertarik%20dengan%20jasa%20desain%20flyer%20dan%20pamflet
                    ID Card Design : harga 20k diskon jadi 15k link pembelian : https://wa.me/6282249883990?text=Saya%20tertarik%20dengan%20jasa%20desain%20ID%20card


                    (jika berminat untuk produk tertentu, returnkan link pembilan dengan format <a href='LINK_PEMBELIAN' target='_blank'>yang dipilih</a>

                    berikan penawaran di awal saja 




                    `}]
                }]
            };

            fetch('https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=AIzaSyCAR4Jxnd5gxwbcBOITE9K9ld-8FQWh7P0', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            })
                .then(response => response.json())
                .then(responseData => {
                    const botResponse = responseData.candidates[0].content.parts[0].text;
                    displayMessage(botResponse, 'bot');
                })
                .catch(error => {
                    console.error('Ada masalah dengan permintaan:', error);
                    displayMessage('Sorry, I am having trouble right now. Please try again later.', 'bot');
                });
        }
    }
