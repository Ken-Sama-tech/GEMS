<div class="modal fade" id="changeImageModal" tabindex="-1" aria-labelledby="changeImageModalLabel" aria-hidden="true">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title">Change Image</h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
                <form method="post" id="upload-form">
                    <input type="hidden" name="lrn" id="upload-form-lrn">
                    <div>
                        <label for="upload-std-img" class="form-label">Upload Image</label>
                        <input class="form-control form-control-lg" id="upload-std-img" name="img" type="file">
                    </div>
                </form>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
                <button type="button" class="btn btn-primary" id="upload-btn">Upload</button>
            </div>
        </div>
    </div>
</div>