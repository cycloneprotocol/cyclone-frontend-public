export default class WebWorker {
    constructor(worker) {
        const code = worker.toString();
        const blob = new Blob(['('+code+')(self)']);
        return new Worker(URL.createObjectURL(blob));
    }
}
