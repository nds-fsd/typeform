const Form = require('../schemas/form.schema')

const getAllForms = async (req, res) => {
    const forms = await Form.find()
    console.log(Form)
    res.status(200).json('ok')
    // Form.find()
    //     .then(forms => { res.json(forms) })
    //     .catch(error => {
    //         console.log('error fetching forms:', error);
    //         res.status(500).json({ error: 'Failed to fetch forms' })
    //     });
};

const getForm = (req, res) => {
    const formId = req.params.id;
    Form.findById(formId)
        .then(formFound => {
            if (!formFound) {
                return res.status(404)
            };
            return res.status(200).json(formFound);
        })
        .catch(error => next(error))
}

const createForm = async (req, res) => {
    const body = req.body;
    await Form.create({
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

const deleteForm = async (req, res) => {
    const formId = req.params.id;

    await Form.findByIdAndDelete(formId)
        .then(deletedForm => {
            res.json(console.log('form deleted successfully', deletedForm));
        })
        .catch(error => {
            console.log('error deleting form', error);
            res.status(500).json({ error: 'failed to delete form' })
        })
};


module.exports = { getAllForms, getForm, createForm, deleteForm }