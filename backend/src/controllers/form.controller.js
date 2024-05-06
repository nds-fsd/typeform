const Form = require('../schemas/form.schema')

const getAllForms = (req, res) => {
    Form.find()
        .then(forms => { res.json(forms) })
        .catch(error => {
            console.log('error fetching forms:', error);
            res.status(500).json({ error: 'Failed to fetch forms' })
        });
};

const createForm = (req, res) => {
    const body = req.body;
    Form.create({
        title: body.title,
        status: 'Active',
        creationDateTime: new Date(),
    })
        .then(createdForm => {
            res.json(createForm)
        })
        .catch(error => {
            console.error('Error creating form:', error);
            res.status(500).json({ error: 'Failed to create form' });
        })
};

const deleteForm = (req, res) => {
    const formId = req.params.id;

    Form.findByIdAndDelete(formId)
        .then(deletedForm => {
            res.json(console.log('form deleted successfully', deletedForm));
        })
        .catch(error => {
            console.log('error deleting form', error);
            res.status(500).json({ error: 'failed to delete form' })
        })
};


module.exports = { getAllForms, createForm, deleteForm }