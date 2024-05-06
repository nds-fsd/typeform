const Form = require('../schemas/form.schema')

const getAllForms = async (req, res) => {
    await Form.find()
        .then(allForms => { res.json(allForms) })
        .catch(error => {
            console.log('error fetching forms:', error);
            res.status(500).json({ error: 'Failed to fetch forms' })
        })
};

const getForm = async (req, res) => {
    await Form.findById(req.params.id)
        .then(formFound => {
            if (!formFound) {
                res.status(404).json({ error: 'failed to get form' });
                console.log(`failed to get form with ID ${req.params.id}`)
            };
            return res.status(200).json(formFound);
        })
        .catch(error => {
            res.status(404).json({ error: 'failed to get form' })
        })
};

const createForm = async (req, res) => {
    // Model.create() une: const newForm = new Form(data);
    // await newForm.save();
    // res.send(newForm);
    const body = req.body
    await Form.create({
        body
    })
        .then(newForm => {
            res.json(newForm)
        })
        .catch(error => {
            console.error('Failed to create form:', error);
            res.status(500).json({ error: 'Failed to create form' });
        })
};

const updateForm = (req, res) => {
    // automatically saves the datetime of the last update
    req.body.editDateTime = new Date();

    const updatedForm = Form.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
    })
        .then(updateForm => {
            if (!updatedForm) {
                return res.status(404).json({ error: 'Form not found' });
            }
            res.json(updatedForm)
        })
        .catch(error => {
            console.error('Error updating form:', error);
            res.status(500).json({ error: 'Failed to update form' });
        })
};

const deleteForm = async (req, res) => {
    await Form.findByIdAndDelete(req.params.id)
        .then(deletedForm => {
            if (!deletedForm) {
                res.status(404).json
                    ({
                        error: 'the form you want to delete was not found'
                    })
            }
            res.json(console.log('form deleted successfully', deletedForm));
        })
        .catch(error => {
            console.log('error deleting form', error);
            res.status(500).json({ error: 'failed to delete form' })
        })
};


module.exports = { getAllForms, getForm, createForm, updateForm, deleteForm }