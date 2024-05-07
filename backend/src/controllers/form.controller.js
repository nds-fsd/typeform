const Form = require('../schemas/form.schema')

const getAllForms = async (req, res) => {
    try {
        const allForms = await Form.find();
        res.json(allForms)
    } catch (error) {
        console.log('Failed to get forms:', error);
        res.status(500).json({ error: 'Failed to get forms' });
    }
    // // alternativa .then .catch para lidar com a promise
    // await Form.find()
    //     .then(allForms => { res.json(allForms) })
    //     .catch(error => {
    //         console.log('Failed to get forms:', error);
    //         res.status(500).json({ error: 'Failed to get forms' })
    //     })
};

const getForm = async (req, res) => {
    try {
        const formFound = await Form.findById(req.params.id);
        if (!formFound) {
            res.status(404).json({ error: `Form with ID ${req.params.id} not found` };
        }
        res.status(200).json(formFound)
    } catch (error) {
        res.status(500).json({ error: 'failed to get form' })
    }
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
    await Form.create(req.body)
        .then(newForm => {
            res.json(newForm)
            console.log(newForm)
        })
        .catch(error => {
            console.error('Failed to create form:', error);
            res.status(500).json({ error: 'Failed to create form' });
        })
};

const updateForm = async (req, res) => {
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