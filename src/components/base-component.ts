export abstract class Component<T extends HTMLElement> {
  private templateEl: HTMLTemplateElement;
  private hostEl: HTMLDivElement;
  protected element: T;

  constructor(templateId: string, hostId: string) {
    // Get template element
    this.templateEl = document.getElementById(
      templateId
    )! as HTMLTemplateElement;

    // Get the host element
    this.hostEl = document.getElementById(hostId)! as HTMLDivElement;

    // Create the import node that needs to be attached
    const newNode = document.importNode(this.templateEl.content, true);

    // Set the current element of component
    this.element = newNode.firstElementChild as T;

    // Insert the element into host el
    this.hostEl.insertAdjacentElement("afterbegin", this.element);
  }

  abstract configure(): void;
}
