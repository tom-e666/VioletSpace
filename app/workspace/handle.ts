import {getDatabase, onValue, ref} from "@firebase/database";

interface node{
    id:string,
    color:string,
    title:string,
    content?:string,
}
interface mask{
    id:string,
    color:string,
    title:string,
}
//user credential will be the first node
interface nodeList{
    nodeId:string,
    childNodes:[mask]
}
class NodeHandler{
    private userId:string;
    private nodeList:Map<string,nodeList> = new Map();
    private nodeMap:Map<string,node> = new Map();
    private db:any;
    constructor(userId:string) {
        this.userId = userId;
        this.db=getDatabase();
    }
    protected getNodeList(nodeId:string)
    {
      if(this.nodeList.has(nodeId)!==undefined)
        {
            return this.nodeList.get(nodeId);
        }
      const targetRef= ref(this.db,'nodelist/'+ nodeId)
        onValue(targetRef, (snapshot) => {
            this.nodeList.set(nodeId, snapshot.val());
            return snapshot.val();
        })
    }
    getInitialMask(){
        return this.getNodeList(this.userId);
    }
    getNode(nodeId:string){
        if(this.nodeMap.has(nodeId))
        {
           return this.nodeMap.get(nodeId);
        }
        const nodeRef=ref(this.db,'node/'+nodeId);

    }



}
