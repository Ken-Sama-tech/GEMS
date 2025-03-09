<div class="modal fade" id="edit-violation-record" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="editViolationRecord" aria-hidden="true">
    <div class="modal-dialog modal-lg">
        <div class="modal-content">
            <div class="modal-header">
                <h1 class="modal-title fs-5">Edit Record</h1>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
                <form method="post" class="d-flex flex-wrap" id="edit-violation-record-form">
                    <div class="border-bottom border-success p-2 mb-2 col-12" id="vDescriptions">
                        <section id="article-decription"> </section>
                        <section id="section-description"> </section>
                        <section id="sanction-description"> </section>
                    </div>
                    <input type="hidden" name="vID" id="vID" class="col-12">

                    <div class="container d-flex justify-content-around gap-2">
                        <div class="col-6">
                            <label class="form-label" for="article">Article</label>
                            <select name="article" id="article" class="form-select">
                                <option value="0" id="option">Select Article</option>
                            </select>
                        </div>

                        <div class="col-6">
                            <label for="section" class="form-label col-6">Section</label>
                            <select name="section" id="section" class="form-select">
                                <option value="0" id="option">Select Section</option>
                            </select>
                        </div>
                    </div>

                    <div class="col-12 m-2">
                        <label for="vDate" class="form-label">Violation Date</label>
                        <input type="datetime-local" name="vDate" id="vDate" class="form-control">
                        <label for="sanction" class="form-label">Sanction:</label>
                        <select name="sanction" id="sanction" class="form-select col-12">
                            <option value="0" id="option">Select Sanction</option>
                        </select>
                    </div>

                </form>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
                <button type="button" class="btn btn-primary" id="save-vChanges">Save Changes</button>
            </div>
        </div>
    </div>
</div>