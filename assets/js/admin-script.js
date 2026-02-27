
// Viewing Record Script   --- Modal ---
document.addEventListener('DOMContentLoaded', function () {
    const viewButtons = document.querySelectorAll('.view-button');
    const modal = document.getElementById('view-modal');
    const modalContent = document.getElementById('modal-content');
    const closeModal = document.querySelector('.close');

    viewButtons.forEach(button => {
        button.addEventListener('click', function () {
            const recordId = this.getAttribute('data-id');

            // Show the modal
            modal.style.display = 'block';
            modalContent.innerHTML = 'Loading...';

            // Fetch data via AJAX
            fetch(ajaxurl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
                body: new URLSearchParams({
                    action: 'my_online_client_view_record',
                    record_id: recordId,
                })
            })
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    modalContent.innerHTML = `
                        <table class="form-table">
                            <tr><th>ID:</th><td>${data.data.id}</td></tr>
                            <tr><th>Name:</th><td>${data.data.name}</td></tr>
                            <tr><th>Email:</th><td>${data.data.email}</td></tr>
                            <tr><th>Phone:</th><td>${data.data.phone}</td></tr>
                        </table>
                    `;

                    // ✅ Trigger custom event for extension
                const event = new CustomEvent('MyOnlineClientRecordLoaded', { detail: { recordId, data } });
                document.dispatchEvent(event);
                
                } else {
                    modalContent.innerHTML = `<p>${data.message}</p>`;
                }
            });
        });
    });

    // Close the modal
    closeModal.addEventListener('click', function () {
        modal.style.display = 'none';
    });

    window.addEventListener('click', function (event) {
        if (event.target === modal) {
            modal.style.display = 'none';
        }
    });
});

// Editing Record Script   --- Modal ---
document.addEventListener('DOMContentLoaded', function() {
    const modal = document.getElementById('editModal');
    const closeBtn = modal.querySelector('.close');
    const editButtons = document.querySelectorAll('.edit-button');

    editButtons.forEach(button => {
        button.addEventListener('click', function() {
            const recordId = this.getAttribute('data-id');

            fetch(`${myPluginAjax.ajaxUrl}?action=get_record_data&id=${recordId}`)
                .then(response => response.json())
                .then(data => {
                    if (data.success) {
                        document.getElementById('edit_record_id').value = data.data.id;
                        document.getElementById('edit_name').value = data.data.name;
                        document.getElementById('edit_email').value = data.data.email;
                        document.getElementById('edit_phone').value = data.data.phone;

                        modal.style.display = 'block';
                    } else {
                        console.error('Data fetch failed:', data);
                    }
                })
                .catch(error => console.error('Error:', error));
        });
    });

    closeBtn.addEventListener('click', function() {
        modal.style.display = 'none';
    });

    window.addEventListener('click', function(event) {
        if (event.target === modal) {
            modal.style.display = 'none';
        }
    });
});

// Deleting Record Script
jQuery(document).ready(function ($) {

    let isSubmitting = false;

    $(document).on('click', '.delete-button', function (e) {
        e.preventDefault();

          if(isSubmitting) {
            return;
        }

    isSubmitting = true;

        const recordId = $(this).data('id');
        const $row = $(this).closest('tr');

        // console.log('Delete button clicked. Record ID:', recordId);

        if (!confirm('Are you sure you want to delete this record?')) {
            // console.log('Delete action cancelled by user.');
            return;
        }

        $.ajax({
            url: myPluginAjax.ajaxUrl,
            type: 'POST',
            dataType: 'json',
            data: {
                action: 'my_online_client_delete_record',
                record_id: recordId,
            },
            success: function (response) {
                // console.log('AJAX Success Response:', response);
                isSubmitting = false;
                if (response.success) {
                    // console.log('Record deleted successfully. Removing row...');
                    $row.fadeOut(300, function () {
                        $(this).remove();
                    });
                    $('#form-message').html('<div class="updated"><p>' + response.data.message + '</p></div>');
                } else {
                    // console.log('Delete failed:', response.data.message);
                    $('#form-message').html('<div class="error"><p>' + response.data.message + '</p></div>');
                }
            },
            error: function (xhr, status, error) {
                isSubmitting = false;
                // console.log('AJAX Error:', error);
                // console.log('Response Text:', xhr.responseText);
                $('#form-message').html('<div class="error"><p>Something went wrong. Please try again.</p></div>');
            }
        });
    });

});