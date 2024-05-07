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
            res.status(404).json({ error: 'Form not found' });
        }
        res.status(200).json(formFound)
    } catch (error) {
        console.log('Failed to get form:', error);
        res.status(500).json({ error: 'Failed to get form' })
    }
};

const createForm = async (req, res) => {
    try {
        const newForm = await Form.create(req.body);
        res.json(newForm)

    } catch (error) {
        console.error('Failed to create form:', error);
        res.status(500).json({ error: 'Failed to create form' });
    }
};

const updateForm = async (req, res) => {
    // automatically saves the datetime of the last update
    try {
        req.body.editDateTime = new Date();
        const updatedForm = await Form.findByIdAndUpdate(
            req.params.id, req.body,
            {
                new: true,
            }
        );
        if (!updatedForm) {
            return res.status(404).json({ error: 'Form not found' });
        }
        res.json(updatedForm)

    } catch (error) {
        console.error('Error updating form:', error);
        res.status(500).json({ error: 'Failed to update form' });
    }
};

const deleteForm = async (req, res) => {
    // V1
    // Por alguna razón, el then/catch funciona perfecto (hace el delete y
    // sin retraso/timeout) pero quedaria diferente de los demás
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
    // V2
    // // elimina el form correctamente, pero en insomnia se queda en timeout
    // try {
    //     await Form.findByIdAndDelete(req.params.id);
    //     res.status(200);
    // } catch (error) {
    //     console.log('failed to delete form:', error);
    //     res.status(500).json({ error: 'failed to delete form' })
    // }
};


module.exports = { getAllForms, getForm, createForm, updateForm, deleteForm };
